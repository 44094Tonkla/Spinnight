import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../hooks/useGameState.jsx';
import CardRuleEditor from '../components/CardRuleEditor';
import '../styles/global.css';

const Lobby = () => {
  const { 
    gameState, 
    currentUser, 
    toggleReady, 
    startGame, 
    leaveRoom, 
    loading, 
    setGameType, 
    updateCardRules 
  } = useGameState();
  const navigate = useNavigate();

  const [showRuleEditor, setShowRuleEditor] = useState(false);

  // Real-time listener: Auto-navigate to /game when room status becomes PLAYING
  useEffect(() => {
    if (gameState?.status === 'PLAYING') {
      navigate('/game');
    }
  }, [gameState?.status, navigate]);

  const players = gameState?.players || [];
  const playerCount = players.length;
  const currentUserId = currentUser?.uid;
  const currentPlayer = players.find(p => p.id === currentUserId);
  const isHost = currentPlayer?.isHost || currentUserId === gameState?.hostId;
  const isGameReady = playerCount >= 2;
  const currentGameType = gameState?.gameType || 'SPIN';

  const handleLeave = async () => {
    await leaveRoom();
    navigate('/');
  };

  const handleStartGame = async () => {
    if (!isGameReady || !isHost) return;
    await startGame();
  };

  const getGameLabel = () => {
    switch (currentGameType) {
      case 'CARD': return '🃏 Card Game';
      case 'NEVER': return '🙋 Never Have I Ever';
      case 'BOMB': return '💣 Bomb Roulette';
      default: return '🍾 Spin Game';
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>CONNECTING TO ROOM...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Header Room Info */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.25rem' }}>ROOM CODE</p>
        <h2 style={{ color: 'var(--danger-gold)', fontSize: '2.5rem', margin: 0, letterSpacing: '3px' }}>
          {gameState?.roomCode || 'NO ROOM'}
        </h2>
        <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
          {playerCount} / 12 PLAYERS
        </p>
      </div>

      {/* 🎮 GAME SELECTOR SECTION */}
      <div className="glass-card" style={{ padding: '1.25rem', width: '100%', maxWidth: '700px', textAlign: 'center', marginBottom: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '0.75rem' }}>
          SELECT GAME MODE (โหมดเกมที่เลือก) {isHost ? ' - HOST CHOOSE' : ''}
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
          <button 
            onClick={() => isHost && setGameType('SPIN')}
            disabled={!isHost}
            style={{ 
              padding: '0.75rem 0.5rem', 
              borderRadius: '8px', 
              border: currentGameType === 'SPIN' ? '2px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
              background: currentGameType === 'SPIN' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(0,0,0,0.3)',
              color: currentGameType === 'SPIN' ? 'var(--gold)' : 'var(--text-muted)',
              fontWeight: 'bold',
              cursor: isHost ? 'pointer' : 'default',
              fontSize: '0.85rem'
            }}
          >
            🍾 WHEEL / SPIN
          </button>

          <button 
            onClick={() => isHost && setGameType('CARD')}
            disabled={!isHost}
            style={{ 
              padding: '0.75rem 0.5rem', 
              borderRadius: '8px', 
              border: currentGameType === 'CARD' ? '2px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
              background: currentGameType === 'CARD' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(0,0,0,0.3)',
              color: currentGameType === 'CARD' ? 'var(--gold)' : 'var(--text-muted)',
              fontWeight: 'bold',
              cursor: isHost ? 'pointer' : 'default',
              fontSize: '0.85rem'
            }}
          >
            🃏 CARD GAME
          </button>

          <button 
            onClick={() => isHost && setGameType('NEVER')}
            disabled={!isHost}
            style={{ 
              padding: '0.75rem 0.5rem', 
              borderRadius: '8px', 
              border: currentGameType === 'NEVER' ? '2px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
              background: currentGameType === 'NEVER' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(0,0,0,0.3)',
              color: currentGameType === 'NEVER' ? 'var(--gold)' : 'var(--text-muted)',
              fontWeight: 'bold',
              cursor: isHost ? 'pointer' : 'default',
              fontSize: '0.85rem'
            }}
          >
            🙋 NEVER HAVE I
          </button>

          <button 
            onClick={() => isHost && setGameType('BOMB')}
            disabled={!isHost}
            style={{ 
              padding: '0.75rem 0.5rem', 
              borderRadius: '8px', 
              border: currentGameType === 'BOMB' ? '2px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
              background: currentGameType === 'BOMB' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(0,0,0,0.3)',
              color: currentGameType === 'BOMB' ? 'var(--gold)' : 'var(--text-muted)',
              fontWeight: 'bold',
              cursor: isHost ? 'pointer' : 'default',
              fontSize: '0.85rem'
            }}
          >
            💣 BOMB ROULETTE
          </button>
        </div>

        {/* If Card Game selected, show button to configure rules */}
        {currentGameType === 'CARD' && (
          <div style={{ marginTop: '1rem' }}>
            <button 
              onClick={() => setShowRuleEditor(!showRuleEditor)}
              className="secondary-button"
              style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
            >
              ⚙️ {showRuleEditor ? 'ซ่อนการตั้งค่ากฎไพ่' : 'ตั้งค่า/ดูกฎไพ่ & PRESETS'}
            </button>
          </div>
        )}
      </div>

      {/* Card Rule Editor Modal in Lobby */}
      {showRuleEditor && currentGameType === 'CARD' && (
        <CardRuleEditor 
          currentRules={gameState.cardRules}
          onSaveRules={(newRules) => {
            updateCardRules(newRules);
            setShowRuleEditor(false);
          }}
          isHost={isHost}
          onClose={() => setShowRuleEditor(false)}
        />
      )}

      {/* Players List Grid */}
      {playerCount === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '400px' }}>
          <p style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '1rem' }}>WAITING FOR PLAYERS...</p>
          <p style={{ color: 'var(--text-muted)' }}>Share the room code with your friends to start the party.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem', width: '100%', maxWidth: '800px', marginBottom: '2rem' }}>
          {players.map(player => {
            const isMe = player.id === currentUserId;
            const avatarSrc = player.avatar || player.avatarId || '1';
            return (
              <div 
                key={player.id} 
                className="glass-card" 
                style={{ 
                  padding: '1rem', 
                  textAlign: 'center', 
                  border: isMe ? '2px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.1)' 
                }}
              >
                <img 
                  src={`/images/avatar/${avatarSrc}.png`} 
                  alt={player.name} 
                  onError={(e) => { e.target.src = '/images/avatar/1.png'; }}
                  style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '0.5rem', objectFit: 'cover' }} 
                />
                <p style={{ fontWeight: 'bold', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {player.name} {isMe && <span style={{ fontSize: '0.7rem', color: 'var(--gold)' }}>(YOU)</span>}
                </p>
                <p style={{ color: player.isReady ? 'var(--burning-amber)' : 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {player.isReady ? 'READY' : 'NOT READY'}
                </p>
                {player.isHost && (
                  <span style={{ display: 'inline-block', marginTop: '0.25rem', padding: '2px 8px', background: 'var(--gold)', color: '#000', fontWeight: 'bold', borderRadius: '10px', fontSize: '0.7rem' }}>
                    HOST
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {/* Footer Control Buttons */}
      <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '400px' }}>
        {currentPlayer && (
          <button 
            onClick={() => toggleReady(currentUserId)}
            className="secondary-button" 
            style={{ width: '100%' }}
          >
            {currentPlayer.isReady ? 'CANCEL READY' : 'CLICK TO READY'}
          </button>
        )}

        {!isGameReady && playerCount > 0 && (
          <p style={{ color: 'var(--pressure-red)', fontSize: '0.9rem', textAlign: 'center' }}>
            ต้องมีผู้เล่นอย่างน้อย 2 คนเพื่อเริ่มเกม
          </p>
        )}

        {isHost ? (
          <button 
            onClick={handleStartGame} 
            className="primary-button" 
            disabled={!isGameReady}
            style={{ width: '100%', opacity: isGameReady ? 1 : 0.5, cursor: isGameReady ? 'pointer' : 'not-allowed' }}
          >
            {isGameReady ? `START GAME (${getGameLabel()})` : 'WAITING FOR MORE PLAYERS...'}
          </button>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            รอหัวหน้าห้อง (HOST) เริ่มเกม... [{getGameLabel()}]
          </p>
        )}

        <button 
          onClick={handleLeave} 
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            background: 'transparent', 
            border: '1px solid var(--text-muted)', 
            color: 'var(--text-muted)', 
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '0.5rem'
          }}
        >
          LEAVE ROOM
        </button>
      </div>
    </div>
  );
};

export default Lobby;
