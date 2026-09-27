import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../hooks/useGameState.jsx';
import '../styles/global.css';

const CreateRoom = () => {
  const navigate = useNavigate();
  const { createRoom } = useGameState();
  const [formData, setFormData] = useState({
    playerName: '',
    roomName: 'Friday Night Party',
    avatarId: '1', // Default avatar
    mode: 'CLASSIC',
    rounds: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const avatars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.playerName.trim()) {
      setErrorMsg('กรุณากรอกชื่อผู้เล่น');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg('');
      await createRoom(formData);
      navigate('/room-created');
    } catch (err) {
      console.error('Failed to create room:', err);
      setErrorMsg(err.message || 'เกิดข้อผิดพลาดในการสร้างห้อง');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '2rem', background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>STEP 01</p>
      <h2 style={{ color: 'var(--text-main)', fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>CREATE YOUR ROOM</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>สร้างห้องของคุณเอง แล้วชวนเพื่อนมาร่วมปาร์ตี้</p>
      
      <form onSubmit={handleSubmit} className="glass-card" style={{ width: '100%', maxWidth: '600px', padding: '2rem' }}>
        {errorMsg && (
          <div style={{ padding: '0.75rem', marginBottom: '1rem', background: 'rgba(255, 77, 77, 0.2)', border: '1px solid var(--pressure-red)', color: 'var(--pressure-red)', borderRadius: '4px' }}>
            {errorMsg}
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', letterSpacing: '1px' }}>PLAYER NAME</label>
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
          {isSubmitting ? 'CREATING ROOM...' : 'CREATE ROOM'}
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
