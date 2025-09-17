// 統合APIコントラクトエクスポート
// Unified API Contracts Export

/**
 * React RouterベースオセロゲームのAPIコントラクト統合エクスポート
 *
 * このファイルは各APIコントラクトモジュールからの型定義とインターフェースを
 * 統合してエクスポートし、アプリケーション全体での一貫した型使用を可能にします。
 */

// ゲーム操作関連のエクスポート
export * from "./game-operations";

// ナビゲーション関連のエクスポート
export * from "./navigation";

// 統計・履歴関連のエクスポート
export * from "./statistics-history";

// 追加の共通型定義

/**
 * API レスポンスの基本構造
 */
export interface BaseAPIResponse {
  success: boolean;
  error?: string;
  timestamp: Date;
}

/**
 * ページネーション用の共通インターフェース
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * ページネーション結果の共通インターフェース
 */
export interface PaginationResult {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * 日付範囲の共通インターフェース
 */
export interface DateRange {
  startDate: Date;
  endDate: Date;
}

/**
 * エラー情報の詳細構造
 */
export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}

/**
 * API設定情報
 */
export interface APIConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  enableCaching: boolean;
}

/**
 * 全APIメソッドを統合したメインインターフェース
 */
export interface OthelloGameAPI
  extends import("./game-operations").GameOperationsAPI,
    import("./navigation").NavigationAPI,
    import("./statistics-history").StatisticsHistoryAPI {
  /** API設定取得 */
  getConfig(): APIConfig;

  /** API設定更新 */
  updateConfig(config: Partial<APIConfig>): Promise<void>;

  /** APIヘルスチェック */
  healthCheck(): Promise<{
    status: "healthy" | "unhealthy";
    details: Record<string, any>;
  }>;

  /** キャッシュクリア */
  clearCache(): Promise<void>;
}

/**
 * APIエラーハンドリング用の型ガード
 */
export function isAPIError(response: any): response is APIError {
  return (
    response &&
    typeof response.code === "string" &&
    typeof response.message === "string"
  );
}

/**
 * 成功レスポンスの型ガード
 */
export function isSuccessResponse<T>(
  response: BaseAPIResponse & T
): response is T {
  return response.success === true;
}

/**
 * ページネーション付きレスポンスの型ガード
 */
export function isPaginatedResponse<T>(
  response: any
): response is T & PaginationResult {
  return (
    response &&
    typeof response.totalCount === "number" &&
    typeof response.currentPage === "number" &&
    typeof response.pageSize === "number"
  );
}

/**
 * APIコントラクトのバージョン情報
 */
export const API_CONTRACT_VERSION = "1.0.0";

/**
 * APIエンドポイントの定数定義
 */
export const API_ENDPOINTS = {
  GAME: {
    CREATE: "/api/game/create",
    PLACE_STONE: "/api/game/place-stone",
    GET_VALID_MOVES: "/api/game/valid-moves",
    GET_AI_MOVE: "/api/game/ai-move",
    GET_STATE: "/api/game/state",
    END: "/api/game/end",
    PAUSE_RESUME: "/api/game/pause-resume",
    UNDO: "/api/game/undo",
  },
  NAVIGATION: {
    NAVIGATE: "/api/navigation/navigate",
    BREADCRUMBS: "/api/navigation/breadcrumbs",
    HISTORY: "/api/navigation/history",
    GENERATE_URL: "/api/navigation/generate-url",
  },
  STATISTICS: {
    GET: "/api/statistics/get",
    TIME_SERIES: "/api/statistics/time-series",
    RANKING: "/api/statistics/ranking",
    RESET: "/api/statistics/reset",
  },
  HISTORY: {
    GET: "/api/history/get",
    DETAILS: "/api/history/details",
    EXPORT: "/api/history/export",
  },
} as const;

/**
 * HTTPステータスコードの定数
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * ローカルストレージキーの定数
 */
export const STORAGE_KEYS = {
  USER_PREFERENCES: "othello_user_preferences",
  GAME_STATE: "othello_game_state",
  STATISTICS: "othello_statistics",
  NAVIGATION_HISTORY: "othello_navigation_history",
} as const;
