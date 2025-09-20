import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

// リセットとベーススタイル
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('html', {
  lineHeight: 1.15,
  WebkitTextSizeAdjust: '100%',
});

globalStyle('body', {
  margin: 0,
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif`,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  backgroundColor: vars.color.background,
  color: vars.color.text,
  fontSize: vars.fontSize.base,
  lineHeight: vars.lineHeight.normal,
});

globalStyle('#root', {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

// ボタンのリセット
globalStyle('button', {
  margin: 0,
  fontFamily: 'inherit',
  fontSize: '100%',
  lineHeight: 1.15,
  textTransform: 'none',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  backgroundColor: 'transparent',
});

// リンクのリセット
globalStyle('a', {
  backgroundColor: 'transparent',
  textDecoration: 'none',
  color: 'inherit',
});

// フォーカススタイル
globalStyle('button:focus-visible, a:focus-visible, input:focus-visible', {
  outline: `2px solid ${vars.color.primary}`,
  outlineOffset: '2px',
});

// アクセシビリティ：reduced-motionユーザー用
globalStyle('@media (prefers-reduced-motion: reduce)', {
  '*': {
    animationDuration: '0.01ms !important',
    animationIterationCount: '1 !important',
    transitionDuration: '0.01ms !important',
  },
});