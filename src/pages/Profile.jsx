import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../hooks/useGameState.jsx';
import '../styles/global.css';

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, gameState, leaveRoom } = useGameState();

  const [savedName, setSavedName] = useState(() => {
    return localStorage.getItem('spinnight_player_name') || 'Guest Player';
  });
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    return localStorage.getItem('spinnight_player_avatar') || '1';
  });
  const [isSaved, setIsSaved] = useState(false);

  const avatars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('spinnight_player_name', savedName);
    localStorage.setItem('spinnight_player_avatar', selectedAvatar);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div style={{ padding: '2rem', background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-main)' }}>
      <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>USER ACCOUNT</p>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>PLAYER PROFILE</h2>

      <div className="glass-card" style={{ width: '100%', maxWidth: '600px', padding: '2rem' }}>
        {/* User Identity Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <img 
            src={`/images/avatar/${selectedAvatar}.png`} 
            alt="Profile Avatar" 
            onError={(e) => { e.target.src = '/images/avatar/1.png'; }}
            style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid var(--gold)', objectFit: 'cover' }} 
          />
          <div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>{savedName}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'monospace' }}>
              UID: {currentUser?.uid || 'GUEST-SESSION'}
            </p>
            <span style={{ display: 'inline-block', marginTop: '0.5rem', padding: '2px 8px', background: 'var(--burgundy)', color: '#fff', fontSize: '0.75rem', borderRadius: '4px' }}>
              {currentUser?.isAnonymous ? 'GUEST ACCOUNT (ANONYMOUS)' : 'LOCAL GUEST'}
            </span>
          </div>
        </div>

        {/* Current Active Room Card */}
        {gameState?.roomCode ? (
          <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--gold)', borderRadius: '8px' }}>
            <p style={{ color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '0.25rem' }}>CURRENT ACTIVE ROOM</p>
            <h4 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              CODE: {gameState.roomCode} ({gameState.players?.length || 0} Players)
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
              <button 
                onClick={() => navigate(gameState.status === 'PLAYING' ? '/game' : '/lobby')} 
                className="primary-button"
                style={{ flex: 1, padding: '0.5rem' }}
              >
                GO TO {gameState.status === 'PLAYING' ? 'GAME' : 'LOBBY'}
              </button>
              <button 
                onClick={leaveRoom} 
                style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--pressure-red)', color: 'var(--pressure-red)', borderRadius: '4px', cursor: 'pointer' }}
              >
                LEAVE ROOM
              </button>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: '2rem', textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>คุณยังไม่ได้อยู่ในห้องใดๆ</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
              <button onClick={() => navigate('/create-room')} className="primary-button" style={{ padding: '0.5rem 1rem' }}>
                CREATE ROOM
              </button>
              <button onClick={() => navigate('/join-room')} className="secondary-button" style={{ padding: '0.5rem 1rem' }}>
                JOIN ROOM
              </button>
            </div>
          </div>
        )}

        {/* Profile Settings Form */}
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', letterSpacing: '1px' }}>DEFAULT DISPLAY NAME</label>
            <input 
              type="text" 
              value={savedName} 
              onChange={(e) => setSavedName(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-primary)', border: '1px solid var(--text-muted)', color: 'var(--text-main)', borderRadius: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem', fontSize: '0.8rem', letterSpacing: '1px' }}>DEFAULT AVATAR</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
              {avatars.map(id => (
                <img 
                  key={id} 
                  src={`/images/avatar/${id}.png`} 
                  alt={`Avatar ${id}`}
                  onClick={() => setSelectedAvatar(id)}
                  style={{ 
                    width: '100%', 
                    aspectRatio: '1', 
                    borderRadius: '50%', 
                    cursor: 'pointer',
                    border: selectedAvatar === id ? '3px solid var(--gold)' : '2px solid transparent'
                  }} 
                />
              ))}
            </div>
          </div>

          <button type="submit" className="primary-button" style={{ width: '100%' }}>
            {isSaved ? '✓ SAVED PREFERENCES!' : 'SAVE PROFILE'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
