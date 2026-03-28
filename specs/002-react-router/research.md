# オセロゲーム開発のための技術研究レポート

## 1. 依存関係の具体的バージョン要件

### React 18+とReact Router 6+の互換性

**決定**: React 18.0+ + React Router 7.9.1（最新安定版）を採用

**根拠**:
- React Router v7.9.1（2025年9月現在の最新版）はReact 18との完全互換性を提供
- React Router v5はReact 18との互換性問題があるため、v6以上が必須
- v7はReact 19への準備も含めた長期サポートを提供
- フューチャーフラグによる段階的な移行サポート
- React 18のStrictModeとの既知の互換性問題が解決済み

**検討した代替案**:
- React Router v6.x: 安定性は高いが、最新の機能とパフォーマンス改善がない
- Reach Router: 開発終了のため不採用
- Next.js Router: SPAプロジェクトには過度に複雑

### @vanilla-extract/cssの最新安定版とReactとの統合

**決定**: @vanilla-extract/css v1.17.4 + @vanilla-extract/sprinkles v1.6.5を採用

**根拠**:
- ゼロランタイムCSS-in-JSによる優れたパフォーマンス
- TypeScript完全サポートによるタイプセーフなスタイリング
- ビルド時にスタティックCSSを生成し、バンドルサイズを最小化
- Reactコンポーネントとの自然な統合
- テーマ機能とデザインシステムの構築が容易

**検討した代替案**:
- Styled-components: ランタイムオーバーヘッドが存在
- Emotion: パフォーマンスは改善されたが、ゼロランタイムではない
- Tailwind CSS: 設定の柔軟性に劣る
- CSS Modules: TypeScript統合が弱い

### i18nextのReactバインディング（react-i18next）の推奨バージョン

**決定**: i18next v25.5.2 + react-i18next v15.7.3を採用

**根拠**:
- React 18との完全互換性
- 最新のHooksベースAPI（useTranslation）をサポート
- TypeScript統合の大幅改善（型推論、IDE性能最適化）
- Server-Side Rendering対応
- 豊富なプラグインエコシステム
- パフォーマンス最適化（enableSelector: "optimize"オプション）

**検討した代替案**:
- formatjs（react-intl）: 機能は豊富だが学習コストが高い
- next-intl: Next.js専用で汎用性に欠ける
- LinguiJS: 軽量だが機能が限定的

## 2. AI思考エンジンのアルゴリズム選択

### Webブラウザで動作するオセロAIアルゴリズム

**決定**: Monte Carlo Tree Search (MCTS) + 開始定石データベースのハイブリッド方式

**根拠**:
- MCTSはブラウザのシングルスレッド環境でも効率的に動作
- 時間制限内での柔軟な思考深度調整が可能
- Alpha-Betaよりもメモリ効率が良い
- JavaScript実装における計算量の最適化が容易
- オンライン対戦での実績が豊富

**アルゴリズム比較**:

#### Minimax（基本形）
- **利点**: 実装が単純、理解しやすい
- **欠点**: 計算量が膨大（O(b^d)）、実用的でない
- **結論**: 基本実装には不向き

#### Alpha-Beta枝刈り
- **利点**: Minimaxの大幅改善、理論的な最適解
- **欠点**: 深い探索でも計算時間が長い、評価関数の設計が困難
- **結論**: 高性能CPUでは有効だが、ブラウザには重い

#### Monte Carlo Tree Search (MCTS)
- **利点**: 時間制約に柔軟、メモリ効率、漸進的改善
- **欠点**: 確率的アルゴリズムのため一定の不確実性
- **結論**: ブラウザ環境に最適

**実装戦略**:
- UCB1（Upper Confidence Bound）選択ポリシーを採用
- 開始8手程度の定石データベースで初期効率化
- Web Workerを活用した非同期計算（オプション）

**検討した代替案**:
- Neural Networkベース: 計算量とモデルサイズが課題
- ルールベースAI: 柔軟性に欠け、強度に限界

## 3. PWA実装アプローチ

### React SPAでのPWA実装ベストプラクティス

**決定**: Workbox + カスタムService Workerによる段階的実装

**根拠**:
- Create React App PWAテンプレートをベースとした標準アプローチ
- Workboxライブラリによる効率的なキャッシュ管理
- オフライン・オンラインの seamless な切り替え
- 段階的機能追加によるリスク最小化

**実装アーキテクチャ**:

#### Service Worker設計
```javascript
// キャッシュ戦略
- Static Assets: Precache Strategy
- Game API: Network First with Fallback
- Game State: Cache First with Background Sync
- Images: Stale While Revalidate
```

#### キャッシュ戦略
- **App Shell**: 完全プリキャッシュ
- **ゲーム状態**: IndexedDBとService Worker Cache併用
- **AI計算結果**: 一時的キャッシュで性能向上
- **多言語リソース**: 必要な言語のみ動的読み込み

**検討した代替案**:
- 完全SPAキャッシュ: 初期読み込み時間が長い
- 最小限PWA: オフライン体験が不十分
- フル機能PWA: 複雑性とメンテナンスコスト

### Service Worker、Web App Manifest設定

**Web App Manifest設定**:
```json
{
  "name": "オセロゲーム",
  "short_name": "Othello",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a472a",
  "theme_color": "#2d5a3d",
  "icons": [
    // 複数サイズのアイコン定義
  ],
  "categories": ["games", "entertainment"]
}
```

### オフラインでのゲーム状態管理

**決定**: IndexedDB + Redux Persist + Service Worker Sync

**状態管理戦略**:
- **ゲーム履歴**: IndexedDBで永続化
- **設定**: LocalStorageで保存
- **AI計算キャッシュ**: 一時的キャッシュで高速化
- **オンライン同期**: Background Syncで後処理

**検討した代替案**:
- LocalStorage のみ: 容量制限とパフォーマンス問題
- SessionStorage: 永続性なし
- WebSQL: 非推奨技術

## 4. アクセシビリティ要件の詳細

### ゲームボードのスクリーンリーダー対応

**決定**: ARIA Grid PatternとLive Regionsを活用した実装

**実装方針**:
```jsx
<div
  role="grid"
  aria-label="8x8 オセロゲームボード"
  aria-describedby="game-instructions"
>
  {board.map((row, rowIndex) => (
    <div key={rowIndex} role="row">
      {row.map((cell, colIndex) => (
        <button
          role="gridcell"
          aria-label={`${String.fromCharCode(65 + colIndex)}${rowIndex + 1}: ${cellState}`}
          aria-pressed={isSelected}
          onClick={() => makeMove(rowIndex, colIndex)}
        >
          {/* セルの表示内容 */}
        </button>
      ))}
    </div>
  ))}
</div>
```

**ARIA属性戦略**:
- `role="grid"`: ボード全体の意味づけ
- `role="gridcell"`: 各セルの識別
- `aria-label`: 位置と状態の音声説明
- `aria-live="polite"`: ゲーム状態変更の通知
- `aria-describedby`: ルール説明との関連付け

### キーボードナビゲーション実装

**決定**: Arrow Keys + Enter/Space + Tab Navigation

**ナビゲーション仕様**:
- **矢印キー**: ボード内のフォーカス移動
- **Enter/Space**: セル選択・駒配置
- **Tab**: UI要素間の移動
- **Escape**: キャンセル・メニューへ戻る
- **数字キー**: 難易度選択のショートカット

**実装例**:
```javascript
const handleKeyDown = (event) => {
  switch (event.key) {
    case 'ArrowUp': moveFocus(-1, 0); break;
    case 'ArrowDown': moveFocus(1, 0); break;
    case 'ArrowLeft': moveFocus(0, -1); break;
    case 'ArrowRight': moveFocus(0, 1); break;
    case 'Enter':
    case ' ': makeMove(); break;
  }
};
```

### WCAG 2.1 AA準拠のためのARIA属性

**決定**: 包括的ARIA実装によるWCAG 2.1 AA完全準拠

**準拠要件チェックリスト**:

#### Level A 要件
- ✅ 1.1.1 非テキストコンテンツ: すべての駒とボード状態にalt属性
- ✅ 1.3.1 情報と関係性: 意味的なHTML構造とARIA
- ✅ 1.3.2 意味のある順序: 論理的な読み上げ順序
- ✅ 2.1.1 キーボード: すべての機能をキーボードで操作可能
- ✅ 2.1.2 キーボードトラップなし: フォーカストラップの適切な実装

#### Level AA 要件
- ✅ 1.4.3 コントラスト: 4.5:1以上のコントラスト比
- ✅ 1.4.4 テキストのサイズ変更: 200%まで拡大対応
- ✅ 2.4.6 見出しとラベル: 明確なラベル付け
- ✅ 2.4.7 フォーカスの可視化: 明確なフォーカスインジケーター
- ✅ 3.1.2 部分的に使用されている言語: lang属性の適切な使用

**実装戦略**:
- React-ARIA libraryの活用検討
- axe-core による自動テスト
- NVDA, JAWS, VoiceOverでの実機テスト
- キーボードのみでの操作テスト

**検討した代替案**:
- 基本的アクセシビリティのみ: 法的リスクと利用者除外
- 完全カスタム実装: 開発コストと保守性の問題
- 第三者ライブラリ依存: カスタマイゼーションの制限

## 技術選定まとめ

以上の調査結果に基づき、以下の技術スタックを推奨します：

### コア技術
- **React**: 18.0+
- **React Router**: 7.9.1
- **@vanilla-extract/css**: 1.17.4
- **i18next**: 25.5.2
- **react-i18next**: 15.7.3

### 付随技術
- **AI Engine**: Monte Carlo Tree Search
- **PWA**: Workbox + Custom Service Worker
- **State Management**: Redux Toolkit + Redux Persist
- **Accessibility**: ARIA Grid Pattern + React-ARIA (検討)
- **Build Tool**: Vite (推奨)
- **Testing**: Jest + React Testing Library + axe-core

この技術選定により、高性能で保守性が高く、アクセシブルなオセロゲームの開発が可能となります。