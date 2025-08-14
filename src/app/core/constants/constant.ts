import {ApprovalType, DayOfWeek, ObjectStatus, RepeatedDay} from "../../commons/types";

export const constant = {
  uploadFileError: {
    type: 1,
    min: 2,
    max: 3,
    width: 4,
    height: 5,
  },
  imageError: {
    type: 1,
    min: 2,
    max: 3,
    width: 4,
    height: 5,
  },
  fileError: {
    type: 1,
    min: 2,
    empty: 3,
    over: 4,
    format: 5,
  },
  permission: {
    create: "create",
    edit: "update",
    delete: "delete",
    view: "view",
  },
  responseCode: {
    success: 200,
    authentication: 401,
    forbidden: 403,
    server_error: 500,
  },
  statuses: [
    {
      value: ObjectStatus.Active,
      name: 'Hoạt động'
    },
    {
      value: ObjectStatus.Inactive,
      name: 'Không hoạt động'
    }
  ],
  // listTypes: [
  //   {
  //     value: ListType.Single,
  //     label: 'Danh sách 1 chọn'
  //   },
  //   {
  //     value: ListType.Multiple,
  //     label: 'Danh sách nhiều chọn'
  //   }
  // ],
  dayOfWeeks: [
    {
      value: RepeatedDay.Monday,
      otherValue: DayOfWeek.Mon,
      numberValue: 1,
      shortName: 'T2',
      fullName: 'Thứ 2'
    },
    {
      value: RepeatedDay.Tuesday,
      otherValue: DayOfWeek.Tue,
      numberValue: 2,
      shortName: 'T3',
      fullName: 'Thứ 3'
    },
    {
      value: RepeatedDay.Wednesday,
      otherValue: DayOfWeek.Wed,
      numberValue: 3,
      shortName: 'T4',
      fullName: 'Thứ 4'
    },
    {
      value: RepeatedDay.Thursday,
      otherValue: DayOfWeek.Thu,
      numberValue: 4,
      shortName: 'T5',
      fullName: 'Thứ 5'
    },
    {
      value: RepeatedDay.Friday,
      otherValue: DayOfWeek.Fri,
      numberValue: 5,
      shortName: 'T6',
      fullName: 'Thứ 6'
    },
    {
      value: RepeatedDay.Saturday,
      otherValue: DayOfWeek.Sat,
      numberValue: 6,
      shortName: 'T7',
      fullName: 'Thứ 7'
    },
    {
      value: RepeatedDay.Sunday,
      otherValue: DayOfWeek.Sun,
      numberValue: 0,
      shortName: 'CN',
      fullName: 'Chủ nhật'
    },
  ],
  leaveTypes: [
    {
      value: 'Nghỉ không lý do',
      name: 'Nghỉ không lý do'
    },
    {
      value: 'Cho thôi việc',
      name: 'Cho thôi việc'
    },
    {
      value: 'Có đơn xin chấm dứt HĐLĐ',
      name: 'Có đơn xin chấm dứt HĐLĐ'
    },
    {
      value: 'Giảm biên',
      name: 'Giảm biên'
    },
    {
      value: 'Không đạt thử việc',
      name: 'Không đạt thử việc'
    },
    {
      value: 'Không nhận việc',
      name: 'Không nhận việc'
    },
    {
      value: 'Không tái ký HĐLĐ',
      name: 'Không tái ký HĐLĐ'
    },
    {
      value: 'Sa thải do kỷ luật lao động',
      name: 'Sa thải do kỷ luật lao động'
    },
    {
      value: 'Thuyên chuyển',
      name: 'Thuyên chuyển'
    },
    {
      value: 'Không xác định',
      name: 'Không xác định'
    },
    {
      value: 'Khác',
      name: 'Khác'
    },
  ],
  leaveReasons: [
    {
      value: 'Chấm dứt HĐLĐ do NLĐ bị áp dụng hình thức KL sa thải',
      name: 'Chấm dứt HĐLĐ do NLĐ bị áp dụng hình thức KL sa thải'
    },
    {
      value: 'Có đơn xin chấm dứt HĐLĐ',
      name: 'Có đơn xin chấm dứt HĐLĐ'
    },
    {
      value: 'Không tái ký HĐLĐ',
      name: 'Không tái ký HĐLĐ'
    },
    {
      value: 'NLĐ nghỉ hưu trí, chế độ',
      name: 'NLĐ nghỉ hưu trí, chế độ'
    },
    {
      value: 'Khác',
      name: 'Khác'
    },
  ],
  approvalTypes: [
    {
      value: ApprovalType.Other,
      label: 'Thông thường'
    },
    {
      value: ApprovalType.RoomBooking,
      label: 'Đặt phòng'
    },
    {
      value: ApprovalType.CarBooking,
      label: 'Đặt xe'
    },
    {
      value: ApprovalType.OfficeShopping,
      label: 'Mua hàng'
    },
  ],
  menuKey: {
    MANAGEMENT: 'EOFFICE.MANAGEMENT',
    MANAGEMENT_STAFF: 'EOFFICE.MANAGEMENT.STAFF',
    MANAGEMENT_DEPARTMENT: 'EOFFICE.MANAGEMENT.DEPARTMENT',
    MANAGEMENT_TITLE: 'EOFFICE.MANAGEMENT.TITLE',
    MANAGEMENT_MEETINGROOM: 'EOFFICE.MANAGEMENT.MEETINGROOM',
    MANAGEMENT_MEETINGSCHEDULE: 'EOFFICE.MANAGEMENT.MEETINGSCHEDULE',
    MANAGEMENT_CAR: 'EOFFICE.MANAGEMENT.CAR',
    MANAGEMENT_WORKPROFILE: 'EOFFICE.MANAGEMENT.WORKPROFILE',
    MANAGEMENT_REPORT: 'EOFFICE.MANAGEMENT.REPORT',
    MANAGEMENT_NOTIFICATION: 'EOFFICE.MANAGEMENT.NOTIFICATION',
    MANAGEMENT_PAYROLL: 'EOFFICE.PAYROLL',
    ASSET: 'EOFFICE.ASSET',
    ASSET_ASSET: 'EOFFICE.ASSET.ASSET',
    CONFIG_PROFILE: 'EOFFICE.PROFILE_MANAGEMENT',
    CONFIG_PAYROLL: 'EOFFICE.PAYROLL_MANAGEMENT',
    OFFICE: 'EOFFICE.OFFICE',
    OFFICE_APPROVAL: 'EOFFICE.OFFICE.APPROVAL',
    OFFICE_DOCUMENT: 'EOFFICE.OFFICE.DOCUMENT',
    OFFICE_CHECKIN: 'EOFFICE.OFFICE.CHECKIN',
    SYSTEM_MANAGEMENT: 'EOFFICE.SYSTEM_MANAGEMENT',
    SYSTEM_MANAGEMENT_ACCOUNT: 'EOFFICE.SYSTEM_MANAGEMENT.ACCOUNT',
    SYSTEM_MANAGEMENT_PERMISSION: 'EOFFICE.SYSTEM_MANAGEMENT.PERMISSION',
    REPORT: 'EOFFICE.REPORT',
    REPORT_EMPLOYEE: 'EOFFICE.REPORT.EMPLOYEE',
  },
  excludeOperatorWithoutLoading: [
    'documentUploadFileSuccess'
  ],
  emoji: {
    ":)": "😊",
    ":~": "🤥",
    ":b": "😍",
    ":'": "😢",
    "8-)": "😎",
    ":-((": "😢",
    ":$": "🤑",
    ":3": "😊",
    ":(": "😞",
    ":o": "😲",
    ":d": "😄",
    ":p": "😛",
    ":-h": "😊",
    "&-(": "😡",
    ":(((": "😢",
    ":z": "😴",
    ";-)": "😉",
    "--b": "😛",
    ":))": "😊",
    ":-*": "😘",
    ";p": "😛",
    ";-d": "😄",
    "/-showlove": "❤️",
    ";d": "😄",
    ";f": "😔",
    ":;": "😊",
    ":>": "😊",
    ":l": "😊",
    ":!": "😊",
    "|-)": "😊",
    ";g": "😄",
    ";o": "😊",
    ":v": "✌️",
    ":wipe": "😅",
    ":-dig": "😊",
    ":handclap": "👏",
    "b-)": "😎",
    ":-r": "😊",
    ":-<": "😞",
    ":-o": "😲",
    ";xx": "😳",
    ";-!": "😡",
    ";!": "😠",
    "8*)": "😎",
    ":-f": "😊",
    ";-x": "😚",
    ";?": "😕",
    ";-s": "😖",
    ":-bye": "😊",
    ">-|": "😊",
    "p-(": "😣",
    ":--|": "😐",
    ":q": "🍆",
    "x-)": "😎",
    ":*": "😘",
    ";-a": "😊",
    "/-beer": "🍺",
    "$-)": "🤑",
    ":-l": "😊",
    ";-/": "😕",
    ":t": "😊",
    ":x": "❌",
    ":|": "😐",
    "8*": "😎",
    "/-coffee": "☕️",
    "/-rose": "🌹",
    "/-fade": "🌅",
    "/-bd": "🎂",
    "/-bome": "💣",
    "/-cake": "🍰",
    "/-heart": "❤️",
    "/-break": "💔",
    "/-thanks": "🙏",
    "/-v": "✌️",
    "/-ok": "👌",
    "/-weak": "💪",
    "/-strong": "👍",
    "/-flag": "🚩",
    "/-li": "🤘",
    "/-shit": "💩",
    "/-punch": "👊",
    "/-share": "🔄",
    "_()_": "🍻",
    "/-no": "🚫",
    "/-bad": "👎",
    "/-loveu": "❤️"
  }
};
