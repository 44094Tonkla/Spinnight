import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../hooks/useGameState.jsx';
import '../styles/global.css';

const JoinRoom = () => {
  const navigate = useNavigate();
  const { joinRoom } = useGameState();
  const [formData, setFormData] = useState({ roomCode: '', playerName: '', avatarId: '1' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const avatars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.roomCode.trim() || !formData.playerName.trim()) {
      setError('กรุณากรอกรหัสห้องและชื่อของคุณ');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await joinRoom(formData.roomCode.toUpperCase(), formData.playerName, formData.avatarId);
      navigate('/lobby');
    } catch (err) {
      console.error('Error joining room:', err);
      setError(err.message || 'เกิดข้อผิดพลาดในการเข้าร่วมห้อง');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '2rem', background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-main)' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>JOIN ROOM</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Enter the room code and join the party with your friends.</p>
      
      <form onSubmit={handleSubmit} className="glass-card" style={{ width: '100%', maxWidth: '600px', padding: '2rem' }}>
        {error && (
          <div style={{ padding: '0.75rem', marginBottom: '1rem', background: 'rgba(255, 77, 77, 0.2)', border: '1px solid var(--pressure-red)', color: 'var(--pressure-red)', borderRadius: '4px' }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', letterSpacing: '1px' }}>ROOM CODE</label>
          <input 
            type="text" 
            placeholder="A7K9PX" 
            value={formData.roomCode}
            required 
            onChange={(e) => setFormData({...formData, roomCode: e.target.value.toUpperCase()})} 
            style={{ width: '100%', padding: '1rem', background: 'var(--bg-primary)', border: '1px solid var(--text-muted)', color: 'var(--text-main)', borderRadius: '4px', textTransform: 'uppercase' }} 
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', letterSpacing: '1px' }}>YOUR NAME</label>
          <input 
            type="text" 
            placeholder="Your Name" 
            value={formData.playerName}
            required 
            onChange={(e) => setFormData({...formData, playerName: e.target.value})} 
            style={{ width: '100%', padding: '1rem', background: 'var(--bg-primary)', border: '1px solid var(--text-muted)', color: 'var(--text-main)', borderRadius: '4px' }} 
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '1rem', fontSize: '0.8rem', letterSpacing: '1px' }}>CHOOSE AVATAR</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
            {avatars.map(id => (
              <img 
                key={id} 
                src={`/images/avatar/${id}.png`} 
                alt={`Avatar ${id}`}
                onClick={() => setFormData({...formData, avatarId: id})}
                style={{ 
                  width: '100%', 
                  aspectRatio: '1', 
                  borderRadius: '50%', 
                  cursor: 'pointer',
                  border: formData.avatarId === id ? '3px solid var(--gold)' : '2px solid transparent'
                }} 
              />
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          className="primary-button" 
          disabled={isSubmitting}
          style={{ width: '100%', opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
        >
          {isSubmitting ? 'JOINING ROOM...' : 'JOIN ROOM'}
        </button>
      </form>
    </div>
  );
};

export default JoinRoom;
