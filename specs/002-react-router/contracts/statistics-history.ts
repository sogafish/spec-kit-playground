// 統計・履歴用APIコントラクト
// Statistics & History API Contracts

import { GameMode, AILevel, PieceColor, Player, GameResult } from './game-operations';

/**
 * 統計期間の種別
 */
export enum StatisticsPeriod {
  ALL_TIME = 'all_time',
  LAST_7_DAYS = 'last_7_days',
  LAST_30_DAYS = 'last_30_days',
  LAST_90_DAYS = 'last_90_days',
  THIS_MONTH = 'this_month',
  THIS_YEAR = 'this_year'
}

/**
 * 統計データの集計単位
 */
export enum AggregationUnit {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

/**
 * ゲーム統計の基本情報
 */
export interface BaseGameStatistics {
  /** 総ゲーム数 */
  totalGames: number;
  /** 勝利数 */
  wins: number;
  /** 敗北数 */
  losses: number;
  /** 引き分け数 */
  draws: number;
  /** 勝率（%） */
  winRate: number;
  /** 最高得点 */
  bestScore: number;
  /** 最低得点 */
  worstScore: number;
  /** 平均得点 */
  averageScore: number;
}

/**
 * 時間関連統計
 */
export interface TimeStatistics {
  /** 平均ゲーム時間（秒） */
  averageGameDuration: number;
  /** 最短ゲーム時間（秒） */
  shortestGameDuration: number;
  /** 最長ゲーム時間（秒） */
  longestGameDuration: number;
  /** 総プレイ時間（秒） */
  totalPlayTime: number;
  /** 平均手数 */
  averageMovesPerGame: number;
  /** 最多手数 */
  maxMovesInGame: number;
  /** 最少手数 */
  minMovesInGame: number;
}

/**
 * 連勝・連敗統計
 */
export interface StreakStatistics {
  /** 現在の連勝数 */
  currentWinStreak: number;
  /** 現在の連敗数 */
  currentLossStreak: number;
  /** 最長連勝記録 */
  longestWinStreak: number;
  /** 最長連敗記録 */
  longestLossStreak: number;
  /** 連勝記録達成日時 */
  longestWinStreakDate: Date;
  /** 連敗記録達成日時 */
  longestLossStreakDate: Date;
}

/**
 * AI難易度別統計
 */
export interface AILevelStatistics extends BaseGameStatistics {
  /** AI難易度 */
  aiLevel: AILevel;
  /** 平均AI思考時間（秒） */
  averageAIThinkingTime: number;
}

/**
 * ゲームモード別統計
 */
export interface GameModeStatistics extends BaseGameStatistics {
  /** ゲームモード */
  gameMode: GameMode;
  /** モード固有の追加統計 */
  modeSpecificStats?: Record<string, number>;
}

/**
 * プレイヤー色別統計
 */
export interface PlayerColorStatistics extends BaseGameStatistics {
  /** プレイヤーの石の色 */
  playerColor: PieceColor;
}

/**
 * 完全な統計情報
 */
export interface ComprehensiveStatistics {
  /** 基本統計 */
  overall: BaseGameStatistics;
  /** 時間関連統計 */
  time: TimeStatistics;
  /** 連勝・連敗統計 */
  streaks: StreakStatistics;
  /** AI難易度別統計 */
  byAILevel: AILevelStatistics[];
  /** ゲームモード別統計 */
  byGameMode: GameModeStatistics[];
  /** プレイヤー色別統計 */
  byPlayerColor: PlayerColorStatistics[];
  /** 統計対象期間 */
  period: StatisticsPeriod;
  /** 最終更新日時 */
  lastUpdated: Date;
}

/**
 * 時系列統計データポイント
 */
export interface TimeSeriesDataPoint {
  /** 日付 */
  date: Date;
  /** ゲーム数 */
  games: number;
  /** 勝利数 */
  wins: number;
  /** 敗北数 */
  losses: number;
  /** 引き分け数 */
  draws: number;
  /** 平均得点 */
  averageScore: number;
}

/**
 * 時系列統計データ
 */
export interface TimeSeriesStatistics {
  /** データポイント配列 */
  dataPoints: TimeSeriesDataPoint[];
  /** 集計単位 */
  aggregationUnit: AggregationUnit;
  /** 対象期間 */
  period: StatisticsPeriod;
}

/**
 * ゲーム履歴エントリ
 */
export interface GameHistoryEntry {
  /** ゲームID */
  gameId: string;
  /** ゲーム結果 */
  result: GameResult;
  /** プレイヤー情報 */
  players: {
    /** 自分 */
    self: Player;
    /** 対戦相手 */
    opponent: Player;
  };
  /** 最終スコア */
  finalScore: {
    self: number;
    opponent: number;
  };
  /** ゲーム設定 */
  gameSettings: {
    mode: GameMode;
    aiLevel?: AILevel;
    timeLimit?: number;
  };
  /** プレイ日時 */
  playedAt: Date;
  /** ゲーム時間（秒） */
  duration: number;
  /** 総手数 */
  totalMoves: number;
  /** ハイライト手 */
  highlightMoves?: number[];
  /** メモ */
  notes?: string;
}

/**
 * 統計取得リクエスト
 */
export interface GetStatisticsRequest {
  /** 統計期間 */
  period: StatisticsPeriod;
  /** カスタム日付範囲（期間がCUSTOMの場合） */
  customDateRange?: {
    startDate: Date;
    endDate: Date;
  };
  /** 詳細レベル */
  detailLevel: 'basic' | 'comprehensive';
}

/**
 * 統計取得レスポンス
 */
export interface GetStatisticsResponse {
  /** 統計データ */
  statistics: ComprehensiveStatistics;
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * 時系列統計取得リクエスト
 */
export interface GetTimeSeriesStatisticsRequest {
  /** 統計期間 */
  period: StatisticsPeriod;
  /** 集計単位 */
  aggregationUnit: AggregationUnit;
  /** カスタム日付範囲 */
  customDateRange?: {
    startDate: Date;
    endDate: Date;
  };
}

/**
 * 時系列統計取得レスポンス
 */
export interface GetTimeSeriesStatisticsResponse {
  /** 時系列統計データ */
  timeSeries: TimeSeriesStatistics;
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * ゲーム履歴取得リクエスト
 */
export interface GetGameHistoryRequest {
  /** ページ番号（1から開始） */
  page: number;
  /** 1ページあたりの件数 */
  pageSize: number;
  /** ソート条件 */
  sortBy: 'playedAt' | 'duration' | 'score' | 'gameMode';
  /** ソート順序 */
  sortOrder: 'asc' | 'desc';
  /** フィルタ条件 */
  filters?: {
    gameMode?: GameMode;
    aiLevel?: AILevel;
    result?: 'win' | 'loss' | 'draw';
    dateRange?: {
      startDate: Date;
      endDate: Date;
    };
  };
}

/**
 * ゲーム履歴取得レスポンス
 */
export interface GetGameHistoryResponse {
  /** ゲーム履歴エントリ配列 */
  history: GameHistoryEntry[];
  /** 総件数 */
  totalCount: number;
  /** 現在のページ番号 */
  currentPage: number;
  /** 1ページあたりの件数 */
  pageSize: number;
  /** 総ページ数 */
  totalPages: number;
  /** 次のページがあるか */
  hasNextPage: boolean;
  /** 前のページがあるか */
  hasPrevPage: boolean;
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * 特定ゲーム詳細取得リクエスト
 */
export interface GetGameDetailsRequest {
  /** ゲームID */
  gameId: string;
}

/**
 * 特定ゲーム詳細取得レスポンス
 */
export interface GetGameDetailsResponse {
  /** ゲーム履歴エントリ */
  gameDetails: GameHistoryEntry;
  /** ゲームの全手順 */
  moveHistory: Array<{
    moveNumber: number;
    player: Player;
    position: string;
    timestamp: Date;
    thinkingTime: number;
    boardStateAfter: string; // ボード状態のスナップショット
  }>;
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * ランキング情報
 */
export interface RankingEntry {
  /** 順位 */
  rank: number;
  /** プレイヤー識別子 */
  playerId: string;
  /** 表示名 */
  displayName: string;
  /** スコア */
  score: number;
  /** 追加情報 */
  additionalInfo: Record<string, any>;
}

/**
 * ランキング取得リクエスト
 */
export interface GetRankingRequest {
  /** ランキング種別 */
  rankingType: 'winRate' | 'totalWins' | 'totalGames' | 'bestScore' | 'longestStreak';
  /** 期間 */
  period: StatisticsPeriod;
  /** 取得件数 */
  limit: number;
  /** AI難易度フィルタ */
  aiLevelFilter?: AILevel;
}

/**
 * ランキング取得レスポンス
 */
export interface GetRankingResponse {
  /** ランキング配列 */
  ranking: RankingEntry[];
  /** 自分の順位情報 */
  myRank?: RankingEntry;
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * 統計リセットリクエスト
 */
export interface ResetStatisticsRequest {
  /** リセット種別 */
  resetType: 'all' | 'period' | 'specific';
  /** 期間指定（resetTypeがperiodの場合） */
  period?: StatisticsPeriod;
  /** 特定データ指定（resetTypeがspecificの場合） */
  specificData?: {
    gameMode?: GameMode;
    aiLevel?: AILevel;
    dateRange?: {
      startDate: Date;
      endDate: Date;
    };
  };
  /** 確認フラグ */
  confirmed: boolean;
}

/**
 * 統計リセットレスポンス
 */
export interface ResetStatisticsResponse {
  /** リセットされたデータ数 */
  resetCount: number;
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * ゲーム履歴エクスポートリクエスト
 */
export interface ExportGameHistoryRequest {
  /** エクスポート形式 */
  format: 'json' | 'csv' | 'xlsx';
  /** フィルタ条件 */
  filters?: {
    gameMode?: GameMode;
    aiLevel?: AILevel;
    dateRange?: {
      startDate: Date;
      endDate: Date;
    };
  };
  /** 含めるフィールド */
  includeFields: string[];
}

/**
 * ゲーム履歴エクスポートレスポンス
 */
export interface ExportGameHistoryResponse {
  /** エクスポートファイルのURL */
  downloadUrl: string;
  /** ファイル名 */
  filename: string;
  /** ファイルサイズ（バイト） */
  fileSize: number;
  /** 有効期限 */
  expiresAt: Date;
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * 統計・履歴APIの全メソッド定義
 */
export interface StatisticsHistoryAPI {
  /** 統計情報取得 */
  getStatistics(request: GetStatisticsRequest): Promise<GetStatisticsResponse>;

  /** 時系列統計取得 */
  getTimeSeriesStatistics(request: GetTimeSeriesStatisticsRequest): Promise<GetTimeSeriesStatisticsResponse>;

  /** ゲーム履歴取得 */
  getGameHistory(request: GetGameHistoryRequest): Promise<GetGameHistoryResponse>;

  /** 特定ゲーム詳細取得 */
  getGameDetails(request: GetGameDetailsRequest): Promise<GetGameDetailsResponse>;

  /** ランキング取得 */
  getRanking(request: GetRankingRequest): Promise<GetRankingResponse>;

  /** 統計リセット */
  resetStatistics(request: ResetStatisticsRequest): Promise<ResetStatisticsResponse>;

  /** ゲーム履歴エクスポート */
  exportGameHistory(request: ExportGameHistoryRequest): Promise<ExportGameHistoryResponse>;

  /** 統計データの手動更新 */
  refreshStatistics(): Promise<void>;

  /** 履歴データの整合性チェック */
  validateHistoryData(): Promise<{ isValid: boolean; issues?: string[] }>;
}