export type MentionUser = { id: string; fullname: string; avatarUrl?: string };

export type MentionToken = {
  id: string;
  name: string;   // text hiển thị, vd: "@Nguyễn Văn A"
  offset: number; // vị trí trong plain text
  length: number;
};

export interface MentionConfig {
  trigger?: string;       // mặc định '@'
  minChars?: number;      // ít nhất bao ký tự sau trigger
  debounceMs?: number;    // trễ tìm kiếm
  mentionClass?: string;  // class CSS cho span
}

export const DEFAULT_MENTION_CONFIG: Required<MentionConfig> = {
  trigger: '@',
  minChars: 0,
  debounceMs: 120,
  mentionClass: 'mention',
};
