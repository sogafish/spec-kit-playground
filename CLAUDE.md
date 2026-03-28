# Claude Code Project Configuration

## Language Settings
- 常に日本語で応答してください
- 仕様書ファイルはすべて日本語で生成してください
- Always respond in Japanese
- Generate all specification files in Japanese

## File Encoding Settings
- すべてのファイルはUTF-8エンコーディングで作成してください
- 日本語テキストファイル作成時は文字化けしないよう注意してください
- Always create files with UTF-8 encoding
- Ensure Japanese text files are properly encoded to prevent mojibake

## Project Context
このプロジェクトは日本語でのやりとりを前提としています。

## Technology Stack & Dependencies

### Core Frontend Technologies
- **React 18.0+**: モダンReactでのSPA開発、Concurrent Features対応
- **React Router 7.9.1**: 最新のクライアントサイドルーティング、React 18完全対応
- **TypeScript**: 型安全性確保、開発効率向上
- **@vanilla-extract/css 1.17.4**: ゼロランタイムCSS-in-JS、TypeScript統合スタイリング
- **i18next 25.5.2 + react-i18next 15.7.3**: 多言語対応、React 18 Hooks API対応

### Game & State Management
- **Monte Carlo Tree Search (MCTS)**: ブラウザ最適化AIアルゴリズム、時間制限対応
- **Redux Toolkit + Redux Persist**: 状態管理とローカル永続化
- **IndexedDB**: ゲーム履歴・統計データの永続化

### PWA & Performance
- **Workbox + Service Worker**: オフライン対応、キャッシュ戦略
- **Web App Manifest**: ネイティブアプリ体験
- **Background Sync**: オフライン時のデータ同期

### Development & Testing
- **Vite**: 高速ビルドツール、HMR対応
- **Jest + React Testing Library**: 単体テスト・統合テスト
- **axe-core**: アクセシビリティ自動テスト

## Current Project: Othello Game (002-react-router)

### Project Overview
React Routerを活用した世界最高品質のオセロゲームSPAアプリケーション。複数ページ間のシームレスなナビゲーション、AI対戦機能、統計・履歴管理、PWA対応を特徴とする。

### Key Features
- **8×8オセロボード**: 標準ルール準拠のゲームプレイ
- **AI対戦**: 4段階の難易度（初級・中級・上級・専門級）
- **ページナビゲーション**: Home → GameMode → GamePlay → Results → Stats
- **ゲーム状態管理**: ページ遷移間での状態保持、ブラウザ履歴対応
- **統計・履歴**: 勝率分析、ゲーム履歴、パフォーマンス追跡
- **多言語対応**: 日本語・英語の動的切り替え
- **アクセシビリティ**: WCAG 2.1 AA準拠、キーボードナビゲーション、スクリーンリーダー対応

### Architecture Patterns
- **Page-based Routing**: React Routerによる宣言的ルーティング
- **Component-driven UI**: 再利用可能なコンポーネント設計
- **Immutable State**: Redux ToolkitによるImmutableな状態管理
- **Progressive Enhancement**: 基本機能からPWA機能まで段階的実装

### File Structure Context
```
specs/002-react-router/
├── spec.md              # 機能仕様書
├── research.md          # 技術調査レポート
├── data-model.md        # データモデル設計
├── quickstart.md        # クイックスタート・テストシナリオ
└── contracts/           # TypeScript APIコントラクト
    ├── game-operations.ts    # ゲーム操作API
    ├── navigation.ts         # ナビゲーションAPI
    ├── statistics-history.ts # 統計・履歴API
    └── index.ts             # 統合エクスポート
```

### Development Guidelines
- **React Router優先**: ナビゲーション実装ではReact Routerパターンを活用
- **TypeScript First**: 型定義ベースの開発、contractsディレクトリ参照
- **アクセシビリティ必須**: ARIA属性、キーボードナビゲーション実装
- **PWA段階的実装**: Service Worker、Web App Manifest、オフライン対応
- **パフォーマンス重視**: バンドルサイズ、レンダリング最適化
