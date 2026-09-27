import { createContext, useContext, useMemo } from 'react';
import useRoom from './useRoom';
import { DEFAULT_CARD_RULES } from '../utils/cardDeck';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const roomHook = useRoom();
  const { roomData, roomCode, currentUser, loading, error } = roomHook;

  // Derive unified gameState from Firestore roomData or fallback to defaults
  const gameState = useMemo(() => {
    if (!roomData) {
      return {
        roomCode: roomCode || null,
        roomName: "",
        mode: "CLASSIC",
        rounds: 5,
        status: "HOME",
        players: [],
        selectedPlayerId: null,
        selectedPlayer: null,
        currentChallenge: null,
        currentRound: 0,
        gameStatus: 'LOBBY',
        scores: {},
        currentTurn: 0,
        spinResult: null,
        boardState: {},
        hostId: null,
        // Card Game defaults
        gameType: 'SPIN',
        cardRules: DEFAULT_CARD_RULES,
        remainingDeck: [],
        currentCard: null,
        drawnHistory: [],
        // Never Have I Ever defaults
        currentAskerId: null,
        currentQuestion: '',
        votes: {},
        roundStatus: 'SELECTING_ASKER',
        // Bomb Roulette defaults
        currentHolderId: null,
        explodeAt: null,
        durationSec: 20,
        showTimerVisible: true,
        isExploded: false,
        loserId: null,
        bombStatus: 'READY'
      };
    }

    const gs = roomData.gameState || {};

    let mappedStatus = "LOBBY";
    if (roomData.status === "playing") mappedStatus = "PLAYING";
    else if (roomData.status === "finished") mappedStatus = "FINISHED";
    else if (roomData.status === "waiting") mappedStatus = "LOBBY";

    return {
      roomCode: roomData.roomCode || roomCode,
      roomName: roomData.roomName || "",
      mode: roomData.mode || "CLASSIC",
      rounds: roomData.rounds || 5,
      status: mappedStatus,
      rawStatus: roomData.status,
      players: roomData.players || [],
      selectedPlayerId: gs.selectedPlayerId || null,
      selectedPlayer: gs.selectedPlayer || null,
      currentChallenge: gs.currentChallenge || null,
      currentRound: gs.currentRound || 0,
      gameStatus: gs.gameStatus || 'LOBBY',
      scores: gs.scores || {},
      currentTurn: gs.currentTurn || 0,
      spinResult: gs.spinResult || null,
      boardState: gs.boardState || {},
      hostId: roomData.hostId || null,
      // Card Game state
      gameType: gs.gameType || 'SPIN',
      cardRules: gs.cardRules || DEFAULT_CARD_RULES,
      remainingDeck: gs.remainingDeck || [],
      currentCard: gs.currentCard || null,
      drawnHistory: gs.drawnHistory || [],
      // Never Have I Ever state
      currentAskerId: gs.currentAskerId || null,
      currentQuestion: gs.currentQuestion || '',
      votes: gs.votes || {},
      roundStatus: gs.roundStatus || 'SELECTING_ASKER',
      // Bomb Roulette state
      currentHolderId: gs.currentHolderId || null,
      explodeAt: gs.explodeAt || null,
      durationSec: gs.durationSec || 20,
      showTimerVisible: gs.showTimerVisible !== undefined ? gs.showTimerVisible : true,
      isExploded: gs.isExploded || false,
      loserId: gs.loserId || null,
      bombStatus: gs.bombStatus || 'READY'
    };
  }, [roomData, roomCode]);

  const setGameState = (action) => {
    if (typeof action === 'function') {
      const nextState = action(gameState);
      roomHook.updateGameState(nextState);
    } else {
      roomHook.updateGameState(action);
    }
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        currentUser,
        loading,
        error,
        createRoom: roomHook.createRoom,
        joinRoom: roomHook.joinRoom,
        updateGameState: roomHook.updateGameState,
        setGameType: roomHook.setGameType,
        updateCardRules: roomHook.updateCardRules,
        drawCard: roomHook.drawCard,
        resetDeck: roomHook.resetDeck,
        pickAsker: roomHook.pickAsker,
        submitQuestion: roomHook.submitQuestion,
        submitVote: roomHook.submitVote,
        revealResults: roomHook.revealResults,
        startBombGame: roomHook.startBombGame,
        toggleBombTimerVisibility: roomHook.toggleBombTimerVisibility,
        passBomb: roomHook.passBomb,
        triggerExplosion: roomHook.triggerExplosion,
        backToLobby: roomHook.backToLobby,
        leaveRoom: roomHook.leaveRoom,
        toggleReady: roomHook.toggleReady,
        startGame: roomHook.startGame,
        roomCode: roomHook.roomCode
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
};

export default useGameState;
