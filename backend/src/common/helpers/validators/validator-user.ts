import type { Result } from '../../types/result';

/** ユーザ ID の入力チェック */
export const isValidUserId = (userId: string): Result<boolean> => {
  if(userId.trim() === '') return { error: 'ユーザ ID を入力してください' };
  if(!/^[a-z0-9-]+$/.test(userId)) return { error: 'ユーザ ID は数字・英小文字・ハイフンのみ使用できます' };
  if(userId.length > 25) return { error: 'ユーザ ID は25文字以内である必要があります' };
  return { result: true };  // バリデーション成功
};

/** パスワードの入力チェック */
export const isValidPassword = (password: string): Result<boolean> => {
  if(password.trim() === '') return { error: 'パスワードを入力してください' };
  if(!/^[\w!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+$/.test(password)) return { error: 'パスワードは半角英数字と記号のみ使用できます' };
  if(password.length < 8 || password.length > 16) return { error: 'パスワードは8文字以上16文字以内である必要があります' };
  return { result: true };  // バリデーション成功
};