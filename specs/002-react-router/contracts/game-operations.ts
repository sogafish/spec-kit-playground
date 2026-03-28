// ゲーム操作用APIコントラクト
// Game Operations API Contracts

/**
 * ボード上の位置を表現するインターフェース
 */
export interface Position {
  /** 行番号（0-7） */
  row: number;
  /** 列番号（0-7） */
  col: number;
  /** 棋譜記法（例: "D3"） */
  notation: string;
}

/**
 * セルの状態を表現する列挙型
 */
export enum CellState {
  EMPTY = 'empty',
  BLACK = 'black',
  WHITE = 'white',
  VALID_MOVE = 'valid_move'
}

/**
 * プレイヤーの石の色
 */
export enum PieceColor {
  BLACK = 'black',
  WHITE = 'white'
}

/**
 * プレイヤー種別
 */
export enum PlayerType {
  HUMAN = 'human',
  AI = 'ai'
}

/**
 * AI難易度レベル
 */
export enum AILevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert'
}

/**
 * ゲームモード
 */
export enum GameMode {
  HUMAN_VS_AI = 'human_vs_ai',
  HUMAN_VS_HUMAN = 'human_vs_human',
  AI_VS_AI = 'ai_vs_ai'
}

/**
 * ゲーム状態
 */
export enum GameStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  PAUSED = 'paused',
  FINISHED = 'finished',
  ABORTED = 'aborted'
}

/**
 * プレイヤー情報
 */
export interface Player {
  /** プレイヤー一意ID */
  id: string;
  /** プレイヤー種別 */
  type: PlayerType;
  /** 石の色 */
  color: PieceColor;
  /** 表示名 */
  name: string;
  /** AI難易度（AIプレイヤーの場合） */
  aiLevel?: AILevel;
}

/**
 * ゲーム設定
 */
export interface GameSettings {
  /** ゲームモード */
  mode: GameMode;
  /** AI難易度（AI対戦時） */
  aiLevel: AILevel;
  /** 制限時間（秒、nullの場合は無制限） */
  timeLimit: number | null;
  /** 音声効果の有効化 */
  soundEnabled: boolean;
  /** アニメーションの有効化 */
  animationEnabled: boolean;
}

/**
 * ゲームスコア
 */
export interface GameScore {
  /** 黒石の数 */
  black: number;
  /** 白石の数 */
  white: number;
}

/**
 * ゲームの手
 */
export interface GameMove {
  /** 手番号 */
  moveNumber: number;
  /** プレイヤー */
  player: Player;
  /** 配置位置 */
  position: Position;
  /** 裏返されたセルの位置配列 */
  flippedCells: Position[];
  /** 実行時刻 */
  timestamp: Date;
  /** 思考時間（秒） */
  thinkingTime: number;
}

/**
 * ボード状態
 */
export interface BoardState {
  /** 8x8のセル状態配列 */
  cells: CellState[][];
  /** 有効な手の配列 */
  validMoves: Position[];
  /** 直前の手 */
  lastMove: Position | null;
  /** 最後に裏返されたセル */
  flippedCells: Position[];
}

/**
 * 完全なゲーム状態
 */
export interface GameState {
  /** ゲーム一意ID */
  gameId: string;
  /** ボード状態 */
  board: BoardState;
  /** 現在のプレイヤー */
  currentPlayer: Player;
  /** 対戦相手プレイヤー */
  opponent: Player;
  /** ゲーム設定 */
  settings: GameSettings;
  /** 手順履歴 */
  moveHistory: GameMove[];
  /** ゲーム状況 */
  status: GameStatus;
  /** 現在スコア */
  score: GameScore;
  /** ゲーム開始時刻 */
  startTime: Date;
  /** 最終更新時刻 */
  lastUpdateTime: Date;
}

/**
 * 新規ゲーム作成リクエスト
 */
export interface CreateGameRequest {
  /** ゲーム設定 */
  settings: GameSettings;
  /** プレイヤー1（黒石） */
  player1: Omit<Player, 'id'>;
  /** プレイヤー2（白石） */
  player2: Omit<Player, 'id'>;
}

/**
 * ゲーム作成レスポンス
 */
export interface CreateGameResponse {
  /** 作成されたゲーム状態 */
  gameState: GameState;
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * 石配置リクエスト
 */
export interface PlaceStoneRequest {
  /** ゲームID */
  gameId: string;
  /** 配置位置 */
  position: Position;
  /** プレイヤーID */
  playerId: string;
}

/**
 * 石配置レスポンス
 */
export interface PlaceStoneResponse {
  /** 更新されたゲーム状態 */
  gameState: GameState;
  /** 配置された手の情報 */
  move: GameMove;
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * 有効手取得リクエスト
 */
export interface GetValidMovesRequest {
  /** ゲームID */
  gameId: string;
  /** プレイヤーの石の色 */
  playerColor: PieceColor;
}

/**
 * 有効手取得レスポンス
 */
export interface GetValidMovesResponse {
  /** 有効な手の配列 */
  validMoves: Position[];
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * AI手取得リクエスト
 */
export interface GetAILMoveRequest {
  /** ゲームID */
  gameId: string;
  /** AI難易度 */
  aiLevel: AILevel;
  /** 思考時間制限（ミリ秒） */
  thinkingTimeLimit?: number;
}

/**
 * AI手取得レスポンス
 */
export interface GetAIMoveResponse {
  /** AI選択位置 */
  position: Position;
  /** 思考時間（秒） */
  thinkingTime: number;
  /** 評価値（内部使用） */
  evaluation?: number;
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * ゲーム状態取得リクエスト
 */
export interface GetGameStateRequest {
  /** ゲームID */
  gameId: string;
}

/**
 * ゲーム状態取得レスポンス
 */
export interface GetGameStateResponse {
  /** ゲーム状態 */
  gameState: GameState;
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * ゲーム終了リクエスト
 */
export interface EndGameRequest {
  /** ゲームID */
  gameId: string;
  /** 終了理由 */
  reason: 'normal' | 'forfeit' | 'time_out' | 'error';
  /** 終了を要求したプレイヤーID */
  playerId?: string;
}

/**
 * ゲーム終了レスポンス
 */
export interface EndGameResponse {
  /** 最終ゲーム状態 */
  finalGameState: GameState;
  /** ゲーム結果 */
  result: GameResult;
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * ゲーム結果
 */
export interface GameResult {
  /** 勝者（引き分けの場合null） */
  winner: Player | null;
  /** 最終スコア */
  finalScore: GameScore;
  /** ゲームタイプ */
  gameMode: GameMode;
  /** 総手数 */
  totalMoves: number;
  /** ゲーム時間（秒） */
  duration: number;
  /** 終了理由 */
  endReason: string;
  /** 完了時刻 */
  completedAt: Date;
}

/**
 * ゲーム一時停止/再開リクエスト
 */
export interface PauseResumeGameRequest {
  /** ゲームID */
  gameId: string;
  /** アクション（pause/resume） */
  action: 'pause' | 'resume';
  /** プレイヤーID */
  playerId: string;
}

/**
 * ゲーム一時停止/再開レスポンス
 */
export interface PauseResumeGameResponse {
  /** 更新されたゲーム状態 */
  gameState: GameState;
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * アンドゥリクエスト
 */
export interface UndoMoveRequest {
  /** ゲームID */
  gameId: string;
  /** プレイヤーID */
  playerId: string;
  /** 戻す手数（デフォルト: 1） */
  steps?: number;
}

/**
 * アンドゥレスポンス
 */
export interface UndoMoveResponse {
  /** 更新されたゲーム状態 */
  gameState: GameState;
  /** 取り消された手の配列 */
  undoneAoves: GameMove[];
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * ゲーム操作APIの全メソッド定義
 */
export interface GameOperationsAPI {
  /** 新規ゲーム作成 */
  createGame(request: CreateGameRequest): Promise<CreateGameResponse>;

  /** 石を配置 */
  placeStone(request: PlaceStoneRequest): Promise<PlaceStoneResponse>;

  /** 有効な手を取得 */
  getValidMoves(request: GetValidMovesRequest): Promise<GetValidMovesResponse>;

  /** AI選択の手を取得 */
  getAIMove(request: GetAIMoveRequest): Promise<GetAIMoveResponse>;

  /** ゲーム状態を取得 */
  getGameState(request: GetGameStateRequest): Promise<GetGameStateResponse>;

  /** ゲームを終了 */
  endGame(request: EndGameRequest): Promise<EndGameResponse>;

  /** ゲーム一時停止/再開 */
  pauseResumeGame(request: PauseResumeGameRequest): Promise<PauseResumeGameResponse>;

  /** 手をアンドゥ */
  undoMove(request: UndoMoveRequest): Promise<UndoMoveResponse>;
}