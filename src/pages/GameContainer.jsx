import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../hooks/useGameState.jsx';
import CardGame from '../components/CardGame';
import NeverHaveIEverGame from '../components/NeverHaveIEverGame';
import BombRouletteGame from '../components/BombRouletteGame';
import '../styles/global.css';

const GameContainer = () => {
  const navigate = useNavigate();
  const { 
    gameState, 
    updateGameState, 
    leaveRoom, 
    backToLobby,
    currentUser, 
    drawCard, 
    resetDeck, 
    updateCardRules,
    pickAsker,
    submitQuestion,
    submitVote,
    revealResults,
    startBombGame,
    toggleBombTimerVisibility,
    passBomb,
    triggerExplosion
  } = useGameState();

  // Real-time listener: Navigate back to /lobby if room status changes to LOBBY/waiting
  useEffect(() => {
    if (gameState?.status === 'LOBBY') {
      navigate('/lobby');
    }
  }, [gameState?.status, navigate]);

  const players = gameState?.players || [];
  const gameStatus = gameState?.gameStatus || 'LOBBY';
  const selectedPlayer = gameState?.selectedPlayer || null;
  const gameType = gameState?.gameType || 'SPIN';

  const currentUserId = currentUser?.uid;
  const currentPlayer = players.find(p => p.id === currentUserId);
  const isHost = currentPlayer?.isHost || currentUserId === gameState?.hostId;

  const handleSpin = async () => {
    if (players.length === 0) return;
    
    await updateGameState({ gameStatus: 'SPINNING', selectedPlayer: null, selectedPlayerId: null });

    setTimeout(async () => {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      await updateGameState({ 
        gameStatus: 'PICKED', 
        selectedPlayer: randomPlayer, 
        selectedPlayerId: randomPlayer.id,
        scores: {
          ...(gameState?.scores || {}),
          [randomPlayer.id]: ((gameState?.scores || {})[randomPlayer.id] || 0) + 10
        }
      });
    }, 3000);
  };

  const handleBackToLobby = async () => {
    await backToLobby();
  };

  const handleLeaveRoom = async () => {
    await leaveRoom();
    navigate('/');
  };

  const renderSpinGame = () => {
    if (players.length < 2) {
      return (
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <h3>WAITING FOR MORE PLAYERS...</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>ต้องมีผู้เล่นอย่างน้อย 2 คนเพื่อเริ่มเกม</p>
        </div>
      );
    }

    switch (gameStatus) {
      case 'SPINNING':
        return (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '3.5rem', color: 'var(--danger-gold)', fontWeight: 'bold', animation: 'pulse 0.8s infinite alternate', marginBottom: '1rem' }}>
              SPINNING... 🎲
            </div>
            <p style={{ color: 'var(--text-muted)' }}>กำลังสุ่มผู้โชคดี...</p>
          </div>
        );

      case 'PICKED':
        return (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', maxWidth: '450px', width: '100%' }}>
            <p style={{ color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '0.75rem', fontSize: '0.85rem' }}>SELECTED PLAYER</p>
            {selectedPlayer && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
                <img 
                  src={`/images/avatar/${selectedPlayer.avatar || selectedPlayer.avatarId || '1'}.png`} 
                  alt={selectedPlayer.name}
                  onError={(e) => { e.target.src = '/images/avatar/1.png'; }}
                  style={{ width: '90px', height: '90px', borderRadius: '50%', marginBottom: '1rem', border: '3px solid var(--gold)', objectFit: 'cover' }}
                />
                <h1 style={{ fontSize: '2.2rem', color: 'var(--gold)', margin: 0, lineHeight: 1.2 }}>
                  {selectedPlayer.name} GOT PICKED! 🍻
                </h1>
              </div>
            )}
            <button onClick={handleSpin} className="primary-button" style={{ width: '100%', fontSize: '1.1rem' }}>
              SPIN AGAIN
            </button>
          </div>
        );

      case 'LOBBY':
      default:
        return (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <h2 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '2rem' }}>READY TO SPIN?</h2>
            <button onClick={handleSpin} className="primary-button" style={{ fontSize: '1.8rem', padding: '1rem 2.5rem' }}>
              SPIN THE BOTTLE 🍾
            </button>
          </div>
        );
    }
  };

  const getGameLabel = () => {
    if (gameType === 'CARD') return '🃏 CARD GAME';
    if (gameType === 'NEVER') return '🙋 NEVER HAVE I EVER';
    if (gameType === 'BOMB') return '💣 BOMB ROULETTE';
    return '🍾 WHEEL SPIN';
  };

  return (
    <div className="game-container-wrapper">
      
      {/* 📐 STANDARDIZED GAME TOP BAR WITH CLEAR BUTTON DISTINCTION */}
      <div className="game-top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            ROOM: <strong style={{ color: 'var(--gold)' }}>{gameState?.roomCode || 'N/A'}</strong>
          </span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ color: 'var(--gold)', fontWeight: 'bold', fontSize: '0.85rem' }}>
            {getGameLabel()}
          </span>
        </div>

        {/* Action Buttons: 🎮 Change Game (Lobby) vs 🚪 Leave Room */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* Button 1: Back to Lobby / Change Game (Orange/Gold) */}
          <button 
            onClick={handleBackToLobby}
            className="secondary-button"
            title="กลับไปยังหน้า Lobby เพื่อเปลี่ยนเลือกเกมใหม่โดยไม่ต้องออกจากห้อง"
            style={{ 
              padding: '0.4rem 0.85rem', 
              fontSize: '0.8rem', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            🎮 เปลี่ยนเกม (LOBBY)
          </button>

          {/* Button 2: Leave Room (Red) */}
          <button 
            onClick={handleLeaveRoom}
            title="ออกจากห้องนี้แล้วกลับสู่หน้าหลัก"
            style={{ 
              padding: '0.4rem 0.85rem', 
              background: 'rgba(255, 77, 77, 0.15)', 
              border: '1px solid var(--pressure-red)', 
              color: 'var(--pressure-red)', 
              borderRadius: '6px', 
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            🚪 ออกจากห้อง (LEAVE)
          </button>
        </div>
      </div>

      {/* Dynamic Game Renderer */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, margin: '1rem 0' }}>
        {gameType === 'CARD' ? (
          <CardGame 
            gameState={gameState}
            currentUser={currentUser}
            onDrawCard={drawCard}
            onResetDeck={resetDeck}
            onUpdateRules={updateCardRules}
            isHost={isHost}
            onLeave={handleLeaveRoom}
          />
        ) : gameType === 'NEVER' ? (
          <NeverHaveIEverGame
            gameState={gameState}
            currentUser={currentUser}
            onPickAsker={pickAsker}
            onSubmitQuestion={submitQuestion}
            onSubmitVote={submitVote}
            onRevealResults={revealResults}
            isHost={isHost}
          />
        ) : gameType === 'BOMB' ? (
          <BombRouletteGame
            gameState={gameState}
            currentUser={currentUser}
            onStartBombGame={startBombGame}
            onToggleTimerVisibility={toggleBombTimerVisibility}
            onPassBomb={passBomb}
            onTriggerExplosion={triggerExplosion}
            isHost={isHost}
          />
        ) : (
          renderSpinGame()
        )}
      </div>

      {/* Players List Footer */}
      <div style={{ width: '100%', marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {players.map(p => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <img 
              src={`/images/avatar/${p.avatar || p.avatarId || '1'}.png`} 
              alt={p.name}
              onError={(e) => { e.target.src = '/images/avatar/1.png'; }}
              style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} 
            />
            <span style={{ fontSize: '0.85rem', color: p.id === selectedPlayer?.id ? 'var(--gold)' : 'var(--text-main)', fontWeight: p.id === selectedPlayer?.id ? 'bold' : 'normal' }}>
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameContainer;
