# データモデル設計書

**プロジェクト**: React Routerベースオセロゲーム
**作成日**: 2025-09-17
**バージョン**: 1.0

## 概要

本文書では、React Routerを活用したオセロゲームアプリケーションの主要エンティティとその関係性を定義します。機能仕様書から抽出されたエンティティを基に、ページ構造、ルート定義、ゲーム状態、ナビゲーション要素、ユーザーセッション管理を体系化します。

## エンティティ定義

### 1. ページエンティティ

#### Page
アプリケーションの各画面を表現する基本エンティティ

**属性:**
- `id`: string - ページの一意識別子
- `title`: string - ページタイトル
- `path`: string - URLパス
- `component`: string - 対応するReactコンポーネント名
- `meta`: PageMeta - SEO・メタ情報
- `access`: AccessLevel - アクセス権限レベル
- `layout`: LayoutType - 使用するレイアウトタイプ

**ページ種別:**

##### HomePage
- `id`: "home"
- `title`: "ホーム - オセロゲーム"
- `path`: "/"
- `description`: "ゲームの開始点となるウェルカムページ"
- `features`: ["ゲーム開始ボタン", "メニューナビゲーション", "アプリ紹介"]

##### GameModeSelectionPage
- `id`: "game-mode"
- `title`: "ゲームモード選択"
- `path`: "/game-mode"
- `description`: "AI対戦・対人戦の選択とレベル設定"
- `features`: ["AIレベル選択", "対戦モード選択", "ゲーム設定"]

##### GamePlayPage
- `id`: "gameplay"
- `title`: "ゲームプレイ"
- `path`: "/play/:gameId?"
- `description`: "実際のオセロゲーム画面"
- `features`: ["8x8ボード", "ターン管理", "スコア表示", "ゲーム操作"]

##### ResultsPage
- `id`: "results"
- `title`: "ゲーム結果"
- `path`: "/results/:gameId"
- `description`: "ゲーム終了後の結果表示"
- `features`: ["最終スコア", "勝敗判定", "ゲーム統計", "再戦オプション"]

##### StatsPage
- `id`: "stats"
- `title`: "統計情報"
- `path`: "/stats"
- `description`: "プレイ履歴と統計の表示"
- `features`: ["勝敗記録", "プレイ履歴", "パフォーマンス分析"]

##### ErrorPage
- `id`: "error"
- `title`: "エラーページ"
- `path`: "/error"
- `description`: "404エラーやその他のエラー状況の表示"
- `features`: ["エラーメッセージ", "ホームへの誘導", "問題報告"]

### 2. ルートエンティティ

#### Route
アプリケーションのナビゲーション定義

**属性:**
- `path`: string - URLパターン
- `component`: string - 対応するコンポーネント
- `exact`: boolean - 完全一致フラグ
- `params`: RouteParam[] - URLパラメータ定義
- `guards`: RouteGuard[] - アクセス制御
- `loader`: DataLoader? - データ事前読み込み
- `meta`: RouteMeta - ルートメタ情報

**ルート定義:**

##### RootRoute
```
path: "/"
component: "HomePage"
exact: true
guards: []
```

##### GameModeRoute
```
path: "/game-mode"
component: "GameModeSelectionPage"
exact: true
guards: []
```

##### GamePlayRoute
```
path: "/play/:gameId?"
component: "GamePlayPage"
params: [
  {
    name: "gameId",
    type: "string",
    optional: true,
    description: "継続ゲームID"
  }
]
guards: ["ValidGameGuard"]
```

##### ResultsRoute
```
path: "/results/:gameId"
component: "ResultsPage"
params: [
  {
    name: "gameId",
    type: "string",
    required: true,
    description: "完了済みゲームID"
  }
]
guards: ["CompletedGameGuard"]
```

##### StatsRoute
```
path: "/stats"
component: "StatsPage"
exact: true
guards: []
```

##### ErrorRoute
```
path: "*"
component: "ErrorPage"
guards: []
```

#### RouteParam
URLパラメータの定義

**属性:**
- `name`: string - パラメータ名
- `type`: ParamType - データ型（string, number, boolean）
- `required`: boolean - 必須フラグ
- `pattern`: string? - 正規表現パターン
- `description`: string - パラメータの説明

#### RouteGuard
ルートアクセス制御条件

**属性:**
- `name`: string - ガード名
- `condition`: GuardCondition - 検証条件
- `redirectTo`: string - 失敗時リダイレクト先
- `message`: string - エラーメッセージ

**ガード種別:**
- `ValidGameGuard`: 有効なゲームIDかチェック
- `CompletedGameGuard`: 完了済みゲームかチェック
- `ActiveGameGuard`: アクティブなゲームかチェック

### 3. ゲーム状態エンティティ

#### GameState
オセロゲームの完全な状態表現

**属性:**
- `gameId`: string - ゲーム一意識別子
- `board`: BoardState - ボード状態
- `currentPlayer`: Player - 現在のプレイヤー
- `gameSettings`: GameSettings - ゲーム設定
- `gameHistory`: GameHistory - 手順履歴
- `status`: GameStatus - ゲーム状況
- `score`: GameScore - 現在スコア
- `timestamp`: GameTimestamp - 時間情報

#### BoardState
8x8オセロボードの状態

**属性:**
- `cells`: CellState[][] - 8x8のセル状態配列
- `validMoves`: Position[] - 有効な手の配列
- `lastMove`: Position? - 直前の手
- `flippedCells`: Position[] - 最後に裏返されたセル

#### CellState
個別セルの状態

**値:**
- `EMPTY`: 空のセル
- `BLACK`: 黒石
- `WHITE`: 白石
- `VALID_MOVE`: 置ける位置（表示用）

#### Player
プレイヤー情報

**属性:**
- `id`: string - プレイヤーID
- `type`: PlayerType - プレイヤー種別
- `color`: PieceColor - 石の色
- `name`: string - 表示名
- `settings`: PlayerSettings - 個別設定

**PlayerType:**
- `HUMAN`: 人間プレイヤー
- `AI`: AIプレイヤー

**PieceColor:**
- `BLACK`: 黒石（先手）
- `WHITE`: 白石（後手）

#### GameSettings
ゲーム設定情報

**属性:**
- `mode`: GameMode - ゲームモード
- `aiLevel`: AILevel - AI難易度
- `timeLimit`: number? - 制限時間（秒）
- `soundEnabled`: boolean - 音声効果
- `animationEnabled`: boolean - アニメーション
- `theme`: ThemeSettings - テーマ設定

**GameMode:**
- `HUMAN_VS_AI`: 人間対AI
- `HUMAN_VS_HUMAN`: 人間対人間
- `AI_VS_AI`: AI対AI（観戦モード）

**AILevel:**
- `EASY`: 初級（深度1-2）
- `MEDIUM`: 中級（深度3-4）
- `HARD`: 上級（深度5-6）
- `EXPERT`: 専門級（深度7+）

#### GameHistory
ゲーム履歴と手順記録

**属性:**
- `moves`: GameMove[] - 手順配列
- `timeline`: GameTimeline[] - 時系列記録
- `undoStack`: GameMove[] - Undo用スタック
- `redoStack`: GameMove[] - Redo用スタック

#### GameMove
個別の手の記録

**属性:**
- `moveNumber`: number - 手番号
- `player`: Player - プレイヤー
- `position`: Position - 配置位置
- `flippedCells`: Position[] - 裏返されたセル
- `timestamp`: Date - 実行時刻
- `thinkingTime`: number - 思考時間（秒）

#### Position
ボード上の位置

**属性:**
- `row`: number - 行（0-7）
- `col`: number - 列（0-7）
- `notation`: string - 棋譜記法（例: "D3"）

### 4. ナビゲーションエンティティ

#### Navigation
アプリケーション内ナビゲーション

**属性:**
- `currentRoute`: Route - 現在のルート
- `history`: NavigationHistory - ナビゲーション履歴
- `breadcrumbs`: Breadcrumb[] - パンくずリスト
- `menu`: MenuStructure - メニュー構造

#### NavigationMenu
メニュー構造定義

**属性:**
- `items`: MenuItem[] - メニュー項目
- `layout`: MenuLayout - レイアウト形式
- `visibility`: MenuVisibility - 表示条件

#### MenuItem
個別メニュー項目

**属性:**
- `id`: string - メニューID
- `label`: string - 表示ラベル
- `path`: string - リンク先パス
- `icon`: string? - アイコン識別子
- `order`: number - 表示順序
- `condition`: MenuCondition? - 表示条件
- `children`: MenuItem[]? - サブメニュー

**標準メニュー項目:**
```
- ホーム (/)
- ゲーム開始 (/game-mode)
- 統計 (/stats)
- 設定 (/settings)
- ヘルプ (/help)
```

#### NavigationLink
内部リンク要素

**属性:**
- `to`: string - リンク先パス
- `label`: string - リンクテキスト
- `style`: LinkStyle - スタイル種別
- `state`: LinkState? - 渡す状態情報

#### NavigationButton
ナビゲーション用ボタン

**属性:**
- `action`: NavigationAction - 実行アクション
- `label`: string - ボタンテキスト
- `style`: ButtonStyle - スタイル種別
- `condition`: ButtonCondition? - 表示条件

**NavigationAction:**
- `GO_BACK`: 前ページに戻る
- `GO_FORWARD`: 次ページに進む
- `GO_HOME`: ホームに移動
- `RESTART_GAME`: ゲーム再開
- `EXIT_GAME`: ゲーム終了

### 5. ユーザーセッションエンティティ

#### UserSession
ユーザーセッション情報

**属性:**
- `sessionId`: string - セッション識別子
- `preferences`: UserPreferences - ユーザー設定
- `statistics`: UserStatistics - 統計情報
- `activeGames`: ActiveGame[] - 進行中ゲーム
- `gameHistory`: CompletedGame[] - 完了ゲーム履歴
- `lastActivity`: Date - 最終アクティビティ

#### UserPreferences
ユーザー設定情報

**属性:**
- `language`: Language - 言語設定
- `theme`: Theme - テーマ設定
- `soundSettings`: SoundSettings - 音声設定
- `gameSettings`: DefaultGameSettings - デフォルトゲーム設定
- `accessibility`: AccessibilitySettings - アクセシビリティ設定

**Language:**
- `JA`: 日本語
- `EN`: 英語

**Theme:**
- `LIGHT`: ライトテーマ
- `DARK`: ダークテーマ
- `AUTO`: システム連動

#### UserStatistics
プレイ統計情報

**属性:**
- `totalGames`: number - 総ゲーム数
- `wins`: number - 勝利数
- `losses`: number - 敗北数
- `draws`: number - 引き分け数
- `winRate`: number - 勝率（%）
- `averageGameTime`: number - 平均ゲーム時間
- `bestScore`: number - 最高得点
- `currentStreak`: number - 現在の連勝数
- `longestStreak`: number - 最長連勝記録
- `aiLevelStats`: AILevelStats[] - AI難易度別統計

#### ActiveGame
進行中ゲーム情報

**属性:**
- `gameId`: string - ゲームID
- `gameState`: GameState - 現在のゲーム状態
- `startTime`: Date - 開始時刻
- `lastMoveTime`: Date - 最終手の時刻
- `isPaused`: boolean - 一時停止フラグ

#### CompletedGame
完了済みゲーム記録

**属性:**
- `gameId`: string - ゲームID
- `finalState`: GameState - 最終状態
- `result`: GameResult - 結果情報
- `duration`: number - ゲーム時間（秒）
- `completedAt`: Date - 完了時刻

#### GameResult
ゲーム結果情報

**属性:**
- `winner`: Player? - 勝者（引き分けの場合null）
- `finalScore`: GameScore - 最終スコア
- `gameType`: GameMode - ゲームタイプ
- `totalMoves`: number - 総手数
- `endReason`: EndReason - 終了理由

**EndReason:**
- `NORMAL`: 通常終了
- `FORFEIT`: 投了
- `TIME_OUT`: 時間切れ
- `ERROR`: エラー終了

## エンティティ関係

### ページ ⟷ ルート関係
- 1つのページは1つのルートに対応
- ルートパラメータによるページ状態の制御
- ガード条件によるアクセス制御

### ゲーム状態 ⟷ セッション関係
- アクティブゲームはユーザーセッション内で管理
- ゲーム完了時に統計情報を更新
- ページ遷移時にゲーム状態を保持

### ナビゲーション ⟷ ページ関係
- メニュー項目は特定ページへのリンク
- 現在ページに基づくナビゲーション状態制御
- パンくずリストでの階層表現

## データ永続化

### LocalStorage保存項目
- `userPreferences`: ユーザー設定
- `userStatistics`: 統計情報
- `activeGames`: 進行中ゲーム（一時保存）

### SessionStorage保存項目
- `navigationHistory`: ナビゲーション履歴
- `currentGameState`: 現在のゲーム状態

### IndexedDB保存項目
- `completedGames`: 完了ゲーム履歴
- `gameArchive`: 長期保存ゲームデータ

## 状態管理パターン

### React Router状態
- URLパラメータによるページ状態
- location.stateによる画面間データ受け渡し
- ブラウザ履歴との同期

### アプリケーション状態
- コンテキストAPIによるグローバル状態
- カスタムフックによる状態ロジック
- 永続化ストレージとの同期

### ゲーム状態
- 不変性を保つ状態更新
- 履歴管理によるUndo/Redo機能
- リアルタイム状態同期

---

本データモデルにより、React Routerベースのオセロゲームアプリケーションの構造的な設計基盤が確立されます。各エンティティは独立性と拡張性を保ちながら、必要な関係性を明確に定義しています。