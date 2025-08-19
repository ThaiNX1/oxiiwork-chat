export function urlModify(text: string, isMobile = false) {
  if (!text?.length)
    return text

  const cleaned = text
    .replace(/\u0000/g, ' ')
    .replace(/\s+/g, ' ')// thêm bước đổi xuống dòng thành <br>
    .trim();
  const urlRegex = /(https?:\/\/[^\s"'`<>\]\)]+|www\.[^\s"'`<>\]\)]+)/gi;
  const parts = cleaned?.split(urlRegex);

  let modifyText = '';
  parts.forEach(x => {
    if (x?.length && x.match(urlRegex)?.length) {
      modifyText += isMobile
        ? `<a data-url="${x}" class="text-blue-300-chat owner-color no-underline break-all word-wrap">${x}</a>`
        : `<a href="${x}" target="_blank" class="text-blue-300-chat owner-color no-underline break-all word-wrap">${x}</a>`;
    } else {
      modifyText += x
    }
  })

  return modifyText;

  // return text.replace(urlRegex, function (url) {
  //   return '<a href="' + url + '" target="_blank" class="text-blue-300-chat owner-color no-underline break-all word-wrap">' + url + '</a>';
  // })
}

export function urlVerify(text: string) {
  if (!text?.length)
    return false
  const urlRegex = /(https?:\/\/[^\s"'`<>\]\)]+|www\.[^\s"'`<>\]\)]+)/gi;
  return !!text.match(urlRegex)?.length
}

export function string2date(date: string, format: string = 'dd/MM/yyyy'): Date | null {
  let result = null
  let dateSplit = null
  switch (format) {
    case 'dd/MM/yyyy':
      dateSplit = date.split('/')
      result = new Date(Number(dateSplit[2]), Number(dateSplit[1]) - 1, Number(dateSplit[0]))
      break
    case 'yyy/MM/dd':
      result = new Date(date)
      break
  }
  return result
}

const colorMap: any = {
  'a': '#FF5733', 'b': '#33FF57', 'c': '#3357FF', 'd': '#FF33A1', 'e': '#FFC300',
  'f': '#DAF7A6', 'g': '#581845', 'h': '#900C3F', 'i': '#C70039', 'j': '#1F618D',
  'k': '#6A1B9A', 'l': '#4CAF50', 'm': '#F57F17', 'n': '#FF6F61', 'o': '#2196F3',
  'p': '#00BCD4', 'q': '#3F51B5', 'r': '#CDDC39', 's': '#FF9800', 't': '#FFEB3B',
  'u': '#8BC34A', 'v': '#9C27B0', 'w': '#FF5722', 'x': '#607D8B', 'y': '#795548',
  'z': '#009688',
  '0': 'rgb(82 80 80)', '1': '#424242', '2': '#757575', '3': '#BDBDBD', '4': '#E0E0E0',
  '5': '#FFC107', '6': '#FFEB3B', '7': '#CDDC39', '8': '#8BC34A', '9': '#4CAF50'
};

// Hàm lấy màu từ bảng ánh xạ
export function getColorForChar(ch: string) {
  return colorMap[ch?.toLowerCase()] || '#607D8B'; // Màu mặc định nếu không tìm thấy
}

export function endCodeUriFileDownLoad(urlOrigin: string) {
  // Tìm vị trí dấu / cuối cùng
  const lastSlashIndex = urlOrigin.lastIndexOf('/');

  // Tách base và file name
  const baseUrl = urlOrigin.substring(0, lastSlashIndex + 1);
  const fileName = urlOrigin.substring(lastSlashIndex + 1);
  const encodedFileName = encodeURIComponent(fileName);
  const finalUrl = baseUrl + encodedFileName;
  return finalUrl
}

export function removeVietnameseTones(str: string) {
  return str
    .normalize("NFD")                 // Tách ký tự và dấu
    .replace(/[\u0300-\u036f]/g, "")   // Xóa các dấu
    .replace(/đ/g, "d")                // Chuyển đ → d
    .replace(/Đ/g, "D")
    .toLocaleLowerCase('vi');               // Chuyển Đ → D
}

export function vnKey(input: any): string {
  let s = String(input ?? '');
  // hạ chữ chuẩn theo locale VN (Đ -> đ)
  s = s.toLocaleLowerCase('vi');

  // Ưu tiên remove dấu bằng Unicode normalize
  if (typeof (s as any).normalize === 'function') {
    s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  } else {
    // Fallback cho WebView rất cũ (đã lower-case nên chỉ cần bảng chữ thường)
    s = s
      .replace(/[áàảãạăắằẳẵặâấầẩẫậ]/g, 'a')
      .replace(/[éèẻẽẹêếềểễệ]/g, 'e')
      .replace(/[íìỉĩị]/g, 'i')
      .replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, 'o')
      .replace(/[úùủũụưứừửữự]/g, 'u')
      .replace(/[ýỳỷỹỵ]/g, 'y');
  }
  // đảm bảo 'đ' -> 'd'
  return s.replace(/đ/g, 'd');
}

export function insertSpaceEscapingElementAtCaret(spaceChar: string = '\u00A0') {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;

  const range = sel.getRangeAt(0);
  let container = range.startContainer;

  if (container.nodeType === Node.TEXT_NODE) {
    // Đang ở text node: chèn space bình thường
    range.insertNode(document.createTextNode(spaceChar));
  } else if (container.nodeType === Node.ELEMENT_NODE) {
    const el = container as Element;
    const idx = Math.min(range.startOffset, el.childNodes.length);
    const space = document.createTextNode(spaceChar);

    // Chèn text node vào đúng vị trí caret giữa các child
    if (idx < el.childNodes.length) {
      el.insertBefore(space, el.childNodes[idx]);
    } else {
      el.appendChild(space);
    }
    // Di chuyển range để nằm sau space mới chèn
    const r = document.createRange();
    r.setStart(space, space.nodeValue!.length);
    r.collapse(true);
    sel.removeAllRanges();
    sel.addRange(r);
    return;
  } else {
    // Fallback: chèn vào sau container (ít gặp)
    const space = document.createTextNode(spaceChar);
    container.parentNode?.insertBefore(space, container.nextSibling);
  }

  // Đặt caret sau text node vừa chèn
  const anchor = (range.startContainer.nodeType === Node.TEXT_NODE)
    ? range.startContainer as Text
    : (range.startContainer.nextSibling as Text);
  const r2 = document.createRange();
  r2.setStart(anchor, (anchor.nodeValue || '').length);
  r2.collapse(true);
  sel.removeAllRanges();
  sel.addRange(r2);
}

export function removeEmptySpan(members: [any]) {
  const spans2 = Array.from(document.querySelector('[contenteditable]')?.querySelectorAll('span') || []);
  const sel = window.getSelection();
  console.log('sel', sel);

  const focusNode = sel?.focusNode;
  console.log('focusNode', focusNode);
  const focusEl =
    focusNode instanceof HTMLElement
      ? focusNode
      : focusNode?.parentElement ?? null;
  for (const sp of spans2) {
    const text = sp.innerText || '';
    // Nếu focus đang trong span này
    if (focusEl && focusEl === sp) {
      // Thay span bằng text node
      const textNode = document.createTextNode(text || '');
      sp.replaceWith(textNode);

      // Đặt lại caret vào cuối text node
      const range = document.createRange();
      range.setStart(textNode, textNode.length);
      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);
      continue;
    }

    // Nếu span rỗng hoặc chỉ có '@' => xoá hẳn
    if (sp.childElementCount === 0 && text.trim().length === 0) {
      sp.remove();
    }
  }
}

export function getCaretSpanInfo() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;

  const range = sel.getRangeAt(0);
  let container: Node = range.endContainer;

  // Nếu caret nằm ở ELEMENT_NODE (ví dụ vừa chọn span), thì kiểm tra trong lastChild
  if (container.nodeType === Node.ELEMENT_NODE) {
    if (container.childNodes.length > 0) {
      container = container.childNodes[Math.min(range.endOffset, container.childNodes.length - 1)];
    }
  }

  // Tìm tổ tiên gần nhất là span
  const spanEl = container.nodeType === Node.ELEMENT_NODE
    ? (container as Element).closest('span')
    : (container.parentElement?.closest('span') ?? null);

  if (!spanEl) return null; // Không nằm trong span

  // Xác định vị trí caret so với nội dung span
  const spanRange = document.createRange();
  spanRange.selectNodeContents(spanEl);
  spanRange.collapse(false); // vị trí cuối cùng trong span

  const atEnd = range.compareBoundaryPoints(Range.END_TO_END, spanRange) === 0;

  return {
    span: spanEl,
    inSpan: true,
    atEnd
  };
}