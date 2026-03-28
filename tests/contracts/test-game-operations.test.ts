import { describe, it, expect, beforeEach } from '@jest/globals';
import type {
  GameOperationsAPI,
  GameState,
  PlacePieceRequest,
  PlacePieceResponse,
  AIThinkRequest,
  AIThinkResponse,
  GetValidMovesRequest,
  GetValidMovesResponse,
  InitializeGameRequest,
  InitializeGameResponse,
  GetGameStateRequest,
  GetGameStateResponse,
} from '../../specs/002-react-router/contracts/game-operations';

describe('GameOperationsAPI Contract Tests', () => {
  let gameOperationsAPI: GameOperationsAPI;

  beforeEach(() => {
    // この時点では実装がないため、テストは失敗する
    // 実装後にモックまたは実際のAPIインスタンスを設定
    gameOperationsAPI = {} as GameOperationsAPI;
  });

  describe('initializeGame', () => {
    it('should initialize a new game with correct structure', async () => {
      const request: InitializeGameRequest = {
        gameMode: 'ai',
        aiDifficulty: 'intermediate',
        playerColor: 'black',
      };

      // 実装前なので、この呼び出しは失敗する
      expect(gameOperationsAPI.initializeGame).toBeDefined();

      // 実装後の期待される動作
      const response: InitializeGameResponse = await gameOperationsAPI.initializeGame(request);

      expect(response.success).toBe(true);
      expect(response.gameState).toBeDefined();
      expect(response.gameState.board).toHaveLength(8);
      expect(response.gameState.board[0]).toHaveLength(8);
      expect(response.gameState.currentPlayer).toBe('black');
      expect(response.gameState.gameMode).toBe('ai');
      expect(response.gameState.status).toBe('playing');
      expect(response.gameState.scores.black).toBe(2);
      expect(response.gameState.scores.white).toBe(2);
    });

    it('should handle invalid game mode', async () => {
      const request = {
        gameMode: 'invalid' as any,
        aiDifficulty: 'intermediate',
        playerColor: 'black',
      };

      const response = await gameOperationsAPI.initializeGame(request);

      expect(response.success).toBe(false);
      expect(response.error).toBeDefined();
      expect(response.error).toContain('Invalid game mode');
    });
  });

  describe('placePiece', () => {
    it('should place piece at valid position', async () => {
      const request: PlacePieceRequest = {
        gameId: 'test-game-1',
        position: { row: 2, col: 3 },
        player: 'black',
      };

      expect(gameOperationsAPI.placePiece).toBeDefined();

      const response: PlacePieceResponse = await gameOperationsAPI.placePiece(request);

      expect(response.success).toBe(true);
      expect(response.gameState).toBeDefined();
      expect(response.capturedPieces).toBeDefined();
      expect(Array.isArray(response.capturedPieces)).toBe(true);
      expect(response.validMove).toBe(true);
    });

    it('should reject invalid move', async () => {
      const request: PlacePieceRequest = {
        gameId: 'test-game-1',
        position: { row: 0, col: 0 },
        player: 'black',
      };

      const response: PlacePieceResponse = await gameOperationsAPI.placePiece(request);

      expect(response.success).toBe(false);
      expect(response.validMove).toBe(false);
      expect(response.error).toBeDefined();
      expect(response.error).toContain('Invalid move');
    });

    it('should validate position bounds', async () => {
      const request: PlacePieceRequest = {
        gameId: 'test-game-1',
        position: { row: 8, col: 8 }, // 境界外
        player: 'black',
      };

      const response: PlacePieceResponse = await gameOperationsAPI.placePiece(request);

      expect(response.success).toBe(false);
      expect(response.error).toContain('Position out of bounds');
    });
  });

  describe('getValidMoves', () => {
    it('should return array of valid positions', async () => {
      const request: GetValidMovesRequest = {
        gameId: 'test-game-1',
        player: 'black',
      };

      expect(gameOperationsAPI.getValidMoves).toBeDefined();

      const response: GetValidMovesResponse = await gameOperationsAPI.getValidMoves(request);

      expect(response.success).toBe(true);
      expect(response.validMoves).toBeDefined();
      expect(Array.isArray(response.validMoves)).toBe(true);
      expect(response.validMoves.length).toBeGreaterThan(0);

      // 各有効手の構造確認
      if (response.validMoves.length > 0) {
        const move = response.validMoves[0];
        expect(move.position).toBeDefined();
        expect(typeof move.position.row).toBe('number');
        expect(typeof move.position.col).toBe('number');
        expect(move.captureCount).toBeDefined();
        expect(typeof move.captureCount).toBe('number');
      }
    });
  });

  describe('aiThink', () => {
    it('should return AI move within time limit', async () => {
      const request: AIThinkRequest = {
        gameId: 'test-game-1',
        difficulty: 'intermediate',
        timeLimit: 5000,
      };

      expect(gameOperationsAPI.aiThink).toBeDefined();

      const startTime = Date.now();
      const response: AIThinkResponse = await gameOperationsAPI.aiThink(request);
      const endTime = Date.now();

      expect(response.success).toBe(true);
      expect(response.selectedMove).toBeDefined();
      expect(response.selectedMove.position).toBeDefined();
      expect(response.thinkingTime).toBeDefined();
      expect(response.thinkingTime).toBeLessThanOrEqual(request.timeLimit);
      expect(endTime - startTime).toBeLessThanOrEqual(request.timeLimit + 1000); // 1秒の余裕
    });

    it('should handle different difficulty levels', async () => {
      const difficulties: Array<'beginner' | 'intermediate' | 'advanced' | 'expert'> =
        ['beginner', 'intermediate', 'advanced', 'expert'];

      for (const difficulty of difficulties) {
        const request: AIThinkRequest = {
          gameId: 'test-game-1',
          difficulty,
          timeLimit: 3000,
        };

        const response: AIThinkResponse = await gameOperationsAPI.aiThink(request);

        expect(response.success).toBe(true);
        expect(response.selectedMove).toBeDefined();
        expect(response.evaluation).toBeDefined();
      }
    });
  });

  describe('getGameState', () => {
    it('should return current game state', async () => {
      const request: GetGameStateRequest = {
        gameId: 'test-game-1',
      };

      expect(gameOperationsAPI.getGameState).toBeDefined();

      const response: GetGameStateResponse = await gameOperationsAPI.getGameState(request);

      expect(response.success).toBe(true);
      expect(response.gameState).toBeDefined();

      const gameState = response.gameState;
      expect(gameState.id).toBeDefined();
      expect(gameState.board).toBeDefined();
      expect(gameState.currentPlayer).toMatch(/^(black|white)$/);
      expect(gameState.gameMode).toMatch(/^(ai|human)$/);
      expect(gameState.status).toMatch(/^(playing|finished|paused)$/);
      expect(gameState.scores).toBeDefined();
      expect(typeof gameState.scores.black).toBe('number');
      expect(typeof gameState.scores.white).toBe('number');
    });

    it('should handle non-existent game', async () => {
      const request: GetGameStateRequest = {
        gameId: 'non-existent-game',
      };

      const response: GetGameStateResponse = await gameOperationsAPI.getGameState(request);

      expect(response.success).toBe(false);
      expect(response.error).toBeDefined();
      expect(response.error).toContain('Game not found');
    });
  });

  describe('Game State Validation', () => {
    it('should ensure board state consistency', () => {
      // ボード状態の一貫性をテスト
      const gameState: GameState = {
        id: 'test-game',
        board: Array(8).fill(null).map(() => Array(8).fill('empty')),
        currentPlayer: 'black',
        gameMode: 'ai',
        aiDifficulty: 'intermediate',
        status: 'playing',
        scores: { black: 2, white: 2 },
        moveHistory: [],
        startTime: new Date(),
        settings: {
          showValidMoves: true,
          allowUndo: true,
          playerColor: 'black',
        },
      };

      // 初期状態のセットアップ
      gameState.board[3][3] = 'white';
      gameState.board[3][4] = 'black';
      gameState.board[4][3] = 'black';
      gameState.board[4][4] = 'white';

      // ボード状態とスコアの一貫性をチェック
      let blackCount = 0;
      let whiteCount = 0;

      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (gameState.board[row][col] === 'black') blackCount++;
          if (gameState.board[row][col] === 'white') whiteCount++;
        }
      }

      expect(blackCount).toBe(gameState.scores.black);
      expect(whiteCount).toBe(gameState.scores.white);
    });
  });
});