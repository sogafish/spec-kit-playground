import { createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  color: {
    // ゲームボードカラー
    boardBg: '#2d5016',
    boardBorder: '#1a4d0f',
    boardGrid: '#4a7c59',

    // 石のカラー
    blackPiece: '#1a1a1a',
    whitePiece: '#f5f5f5',
    pieceHighlight: '#ffd700',

    // UIカラー
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    secondary: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',

    // 背景・テキスト
    background: '#ffffff',
    surface: '#f8fafc',
    surfaceHover: '#f1f5f9',
    text: '#1e293b',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',

    // ボーダー
    border: '#e2e8f0',
    borderHover: '#cbd5e1',
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  transition: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
  },
});

// ダークテーマ
export const darkTheme = createTheme(vars, {
  color: {
    // ゲームボードカラー（ダーク用調整）
    boardBg: '#1a4d0f',
    boardBorder: '#0f3a08',
    boardGrid: '#2d5016',

    // 石のカラー
    blackPiece: '#0a0a0a',
    whitePiece: '#ffffff',
    pieceHighlight: '#ffd700',

    // UIカラー
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    secondary: '#94a3b8',
    success: '#22c55e',
    warning: '#facc15',
    error: '#f87171',

    // 背景・テキスト
    background: '#0f172a',
    surface: '#1e293b',
    surfaceHover: '#334155',
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',

    // ボーダー
    border: '#334155',
    borderHover: '#475569',
  },
  // その他のプロパティは同じ値を使用
  space: vars.space,
  fontSize: vars.fontSize,
  lineHeight: vars.lineHeight,
  borderRadius: vars.borderRadius,
  shadow: vars.shadow,
  transition: vars.transition,
});