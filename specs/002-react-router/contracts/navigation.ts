// ナビゲーション用APIコントラクト
// Navigation API Contracts

/**
 * ページ識別子
 */
export enum PageId {
  HOME = 'home',
  GAME_MODE = 'game-mode',
  GAMEPLAY = 'gameplay',
  RESULTS = 'results',
  STATS = 'stats',
  SETTINGS = 'settings',
  HELP = 'help',
  ERROR = 'error'
}

/**
 * ナビゲーションアクション種別
 */
export enum NavigationAction {
  PUSH = 'push',
  REPLACE = 'replace',
  GO_BACK = 'go_back',
  GO_FORWARD = 'go_forward',
  GO_HOME = 'go_home',
  RELOAD = 'reload'
}

/**
 * ページメタ情報
 */
export interface PageMeta {
  /** ページタイトル */
  title: string;
  /** メタディスクリプション */
  description: string;
  /** OGタイトル */
  ogTitle?: string;
  /** OG説明文 */
  ogDescription?: string;
  /** canonical URL */
  canonicalUrl?: string;
  /** robots メタタグ */
  robots?: string;
}

/**
 * ページ定義
 */
export interface PageDefinition {
  /** ページID */
  id: PageId;
  /** URLパス */
  path: string;
  /** ページタイトル */
  title: string;
  /** コンポーネント名 */
  component: string;
  /** メタ情報 */
  meta: PageMeta;
  /** 完全一致フラグ */
  exact: boolean;
  /** 認証が必要か */
  requiresAuth: boolean;
  /** 親ページID */
  parentId?: PageId;
}

/**
 * ルートパラメータ定義
 */
export interface RouteParam {
  /** パラメータ名 */
  name: string;
  /** データ型 */
  type: 'string' | 'number' | 'boolean';
  /** 必須フラグ */
  required: boolean;
  /** デフォルト値 */
  defaultValue?: string | number | boolean;
  /** 正規表現パターン */
  pattern?: string;
  /** 説明文 */
  description: string;
}

/**
 * ページ遷移時の状態情報
 */
export interface NavigationState {
  /** 遷移元ページID */
  fromPage?: PageId;
  /** 遷移理由 */
  reason?: string;
  /** ゲーム関連状態 */
  gameContext?: {
    gameId: string;
    preserveState: boolean;
  };
  /** フォーム関連状態 */
  formContext?: {
    formData: Record<string, any>;
    isDirty: boolean;
  };
  /** 任意の追加データ */
  customData?: Record<string, any>;
}

/**
 * ナビゲーション履歴エントリ
 */
export interface NavigationHistoryEntry {
  /** エントリID */
  id: string;
  /** ページID */
  pageId: PageId;
  /** URLパス */
  path: string;
  /** 遷移時刻 */
  timestamp: Date;
  /** 遷移状態 */
  state: NavigationState;
  /** 滞在時間（秒） */
  duration?: number;
}

/**
 * ページ遷移リクエスト
 */
export interface NavigateRequest {
  /** 遷移先ページID またはパス */
  to: PageId | string;
  /** ナビゲーションアクション */
  action: NavigationAction;
  /** 遷移時状態 */
  state?: NavigationState;
  /** URLパラメータ */
  params?: Record<string, string | number>;
  /** クエリパラメータ */
  query?: Record<string, string>;
  /** リプレース機能（履歴を置き換え） */
  replace?: boolean;
}

/**
 * ページ遷移レスポンス
 */
export interface NavigateResponse {
  /** 成功フラグ */
  success: boolean;
  /** 遷移後のページID */
  currentPageId: PageId;
  /** 遷移後のURLパス */
  currentPath: string;
  /** エラーメッセージ（失敗時） */
  error?: string;
  /** 遷移が阻止された理由 */
  preventedReason?: string;
}

/**
 * ページ離脱チェックリクエスト
 */
export interface BeforeLeaveRequest {
  /** 現在のページID */
  currentPageId: PageId;
  /** 遷移先ページID */
  targetPageId: PageId;
  /** 現在のページ状態 */
  currentState: NavigationState;
}

/**
 * ページ離脱チェックレスポンス
 */
export interface BeforeLeaveResponse {
  /** 遷移許可フラグ */
  allowNavigation: boolean;
  /** 確認が必要か */
  requiresConfirmation: boolean;
  /** 確認メッセージ */
  confirmationMessage?: string;
  /** 阻止理由 */
  preventionReason?: string;
}

/**
 * パンくずリスト項目
 */
export interface BreadcrumbItem {
  /** ラベル */
  label: string;
  /** リンク先パス */
  path?: string;
  /** ページID */
  pageId: PageId;
  /** アクティブフラグ */
  isActive: boolean;
  /** クリック可能フラグ */
  isClickable: boolean;
}

/**
 * パンくずリスト取得レスポンス
 */
export interface GetBreadcrumbsResponse {
  /** パンくずリスト項目配列 */
  breadcrumbs: BreadcrumbItem[];
  /** 成功フラグ */
  success: boolean;
}

/**
 * ページタイトル更新リクエスト
 */
export interface UpdatePageTitleRequest {
  /** ページID */
  pageId: PageId;
  /** 新しいタイトル */
  title: string;
  /** 動的パラメータ */
  params?: Record<string, string>;
}

/**
 * ページメタ更新リクエスト
 */
export interface UpdatePageMetaRequest {
  /** ページID */
  pageId: PageId;
  /** 更新するメタ情報 */
  meta: Partial<PageMeta>;
}

/**
 * 履歴操作リクエスト
 */
export interface HistoryOperationRequest {
  /** 操作種別 */
  operation: 'back' | 'forward' | 'go';
  /** ステップ数（go操作時） */
  steps?: number;
}

/**
 * 履歴操作レスポンス
 */
export interface HistoryOperationResponse {
  /** 成功フラグ */
  success: boolean;
  /** 操作後の現在ページID */
  currentPageId: PageId;
  /** 操作後のURLパス */
  currentPath: string;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * 現在ナビゲーション状態取得レスポンス
 */
export interface GetCurrentNavigationResponse {
  /** 現在のページID */
  currentPageId: PageId;
  /** 現在のURLパス */
  currentPath: string;
  /** URLパラメータ */
  params: Record<string, string>;
  /** クエリパラメータ */
  query: Record<string, string>;
  /** 現在の状態 */
  state: NavigationState;
  /** 履歴内の位置 */
  historyIndex: number;
  /** 戻れるかどうか */
  canGoBack: boolean;
  /** 進めるかどうか */
  canGoForward: boolean;
}

/**
 * ナビゲーション履歴取得レスポンス
 */
export interface GetNavigationHistoryResponse {
  /** 履歴エントリ配列 */
  history: NavigationHistoryEntry[];
  /** 現在の履歴インデックス */
  currentIndex: number;
  /** 成功フラグ */
  success: boolean;
}

/**
 * URL生成リクエスト
 */
export interface GenerateURLRequest {
  /** ページID またはパス */
  pageId: PageId | string;
  /** URLパラメータ */
  params?: Record<string, string | number>;
  /** クエリパラメータ */
  query?: Record<string, string>;
  /** ハッシュフラグメント */
  hash?: string;
  /** 絶対URLフラグ */
  absolute?: boolean;
}

/**
 * URL生成レスポンス
 */
export interface GenerateURLResponse {
  /** 生成されたURL */
  url: string;
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時） */
  error?: string;
}

/**
 * ナビゲーションAPIの全メソッド定義
 */
export interface NavigationAPI {
  /** ページ遷移実行 */
  navigate(request: NavigateRequest): Promise<NavigateResponse>;

  /** ページ離脱前チェック */
  beforeLeave(request: BeforeLeaveRequest): Promise<BeforeLeaveResponse>;

  /** パンくずリスト取得 */
  getBreadcrumbs(pageId: PageId): Promise<GetBreadcrumbsResponse>;

  /** ページタイトル更新 */
  updatePageTitle(request: UpdatePageTitleRequest): Promise<void>;

  /** ページメタ情報更新 */
  updatePageMeta(request: UpdatePageMetaRequest): Promise<void>;

  /** 履歴操作実行 */
  executeHistoryOperation(request: HistoryOperationRequest): Promise<HistoryOperationResponse>;

  /** 現在ナビゲーション状態取得 */
  getCurrentNavigation(): Promise<GetCurrentNavigationResponse>;

  /** ナビゲーション履歴取得 */
  getNavigationHistory(): Promise<GetNavigationHistoryResponse>;

  /** URL生成 */
  generateURL(request: GenerateURLRequest): Promise<GenerateURLResponse>;

  /** 履歴クリア */
  clearHistory(): Promise<void>;

  /** 状態保持ナビゲーション設定 */
  setStatePersistence(pageId: PageId, enabled: boolean): Promise<void>;
}

/**
 * ナビゲーションイベント種別
 */
export enum NavigationEventType {
  BEFORE_NAVIGATE = 'before_navigate',
  NAVIGATE_START = 'navigate_start',
  NAVIGATE_SUCCESS = 'navigate_success',
  NAVIGATE_ERROR = 'navigate_error',
  PAGE_LOAD_START = 'page_load_start',
  PAGE_LOAD_COMPLETE = 'page_load_complete',
  HISTORY_CHANGE = 'history_change'
}

/**
 * ナビゲーションイベント
 */
export interface NavigationEvent {
  /** イベント種別 */
  type: NavigationEventType;
  /** イベント発生時刻 */
  timestamp: Date;
  /** 対象ページID */
  pageId: PageId;
  /** 詳細データ */
  details: Record<string, any>;
  /** エラー情報（エラーイベント時） */
  error?: string;
}

/**
 * ナビゲーションイベントリスナー
 */
export type NavigationEventListener = (event: NavigationEvent) => void;

/**
 * ナビゲーションイベント管理API
 */
export interface NavigationEventAPI {
  /** イベントリスナー登録 */
  addEventListener(eventType: NavigationEventType, listener: NavigationEventListener): void;

  /** イベントリスナー削除 */
  removeEventListener(eventType: NavigationEventType, listener: NavigationEventListener): void;

  /** イベント発火 */
  dispatchEvent(event: NavigationEvent): void;

  /** 全イベントリスナー削除 */
  removeAllEventListeners(): void;
}