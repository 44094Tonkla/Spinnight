import React, { useState } from 'react';
import { DEFAULT_CARD_RULES } from '../utils/cardDeck';
import CardRuleEditor from './CardRuleEditor';
import '../styles/global.css';

const CardGame = ({ 
  gameState, 
  onDrawCard, 
  onResetDeck, 
  onUpdateRules, 
  isHost, 
  onLeave 
}) => {
  const [showRuleEditor, setShowRuleEditor] = useState(false);

  const cardRules = gameState?.cardRules || DEFAULT_CARD_RULES;
  const remainingDeck = gameState?.remainingDeck || [];
  const currentCard = gameState?.currentCard || null;
  const drawnHistory = gameState?.drawnHistory || [];
  const deckSize = remainingDeck.length;

  const isSuitRed = currentCard && (currentCard.suit === '♥' || currentCard.suit === '♦');
  const ruleText = currentCard ? (cardRules[currentCard.rank] || 'ไม่มีกฎสำหรับไพ่ใบนี้') : null;

  return (
    <div style={{ width: '100%', maxWidth: '750px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ color: 'var(--gold)', fontWeight: 'bold', fontSize: '1rem' }}>
          🃏 CARD GAME (เหลือไพ่: {deckSize} / 52 ใบ)
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setShowRuleEditor(!showRuleEditor)} 
            className="secondary-button"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
          >
            ⚙️ {showRuleEditor ? 'ปิดการตั้งค่ากฎ' : 'ตั้งค่า/ดูกฎไพ่'}
          </button>
          
          {isHost && (
            <button 
              onClick={onResetDeck} 
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'transparent', border: '1px solid var(--text-muted)', color: 'var(--text-muted)', borderRadius: '6px', cursor: 'pointer' }}
            >
              🔄 สับสำรับใหม่
            </button>
          )}
        </div>
      </div>

      {/* Rule Editor Modal / Accordion */}
      {showRuleEditor && (
        <CardRuleEditor 
          currentRules={cardRules}
          onSaveRules={(newRules) => {
            onUpdateRules(newRules);
            setShowRuleEditor(false);
          }}
          isHost={isHost}
          onClose={() => setShowRuleEditor(false)}
        />
      )}

      {/* Main Card View Section */}
      <div className="glass-card" style={{ width: '100%', padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '1.5rem' }}>
        
        {currentCard ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {/* Playing Card UI */}
            <div style={{ 
              width: '150px', 
              height: '220px', 
              background: '#fff', 
              borderRadius: '10px', 
              padding: '0.85rem', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(212, 175, 55, 0.4)',
              border: '2px solid var(--gold)',
              color: isSuitRed ? '#d32f2f' : '#212121',
              marginBottom: '1.25rem'
            }}>
              {/* Top Left Rank & Suit */}
              <div style={{ textAlign: 'left', lineHeight: 1 }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{currentCard.rank}</div>
                <div style={{ fontSize: '1.2rem' }}>{currentCard.suit}</div>
              </div>

              {/* Center Large Suit Symbol */}
              <div style={{ fontSize: '3.5rem', lineHeight: 1, alignSelf: 'center' }}>
                {currentCard.suit}
              </div>

              {/* Bottom Right Inverted Rank & Suit */}
              <div style={{ textAlign: 'right', lineHeight: 1, transform: 'rotate(180deg)' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{currentCard.rank}</div>
                <div style={{ fontSize: '1.2rem' }}>{currentCard.suit}</div>
              </div>
            </div>

            {/* Rule Banner */}
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '2px solid var(--gold)', borderRadius: '10px', padding: '1rem 1.25rem', maxWidth: '480px', width: '100%', marginBottom: '1.25rem' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '0.25rem' }}>
                คำสั่งไพ่ใบนี้ (RANK {currentCard.rank})
              </p>
              <h2 style={{ color: 'var(--gold)', fontSize: '1.4rem', margin: 0, fontWeight: 'bold', lineHeight: 1.3 }}>
                {ruleText}
              </h2>
            </div>
          </div>
        ) : (
          <div style={{ padding: '2rem 1rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem', lineHeight: 1 }}>🎴</div>
            <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginBottom: '0.25rem' }}>
              กดปุ่มด้านล่างเพื่อจับไพ่ใบแรก
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              สำรับไพ่พร้อมแล้ว มีทั้งหมด 52 ใบ
            </p>
          </div>
        )}

        {/* Draw Card Button */}
        {deckSize > 0 ? (
          <button 
            onClick={onDrawCard} 
            className="primary-button" 
            style={{ fontSize: '1.3rem', padding: '0.85rem 2.5rem', width: '100%', maxWidth: '320px' }}
          >
            🃏 จับไพ่ (DRAW CARD)
          </button>
        ) : (
          <div style={{ width: '100%', textAlign: 'center' }}>
            <p style={{ color: 'var(--pressure-red)', fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: 'bold' }}>
              ไพ่หมดสำรับแล้ว! 🎴
            </p>
            {isHost && (
              <button onClick={onResetDeck} className="primary-button" style={{ padding: '0.75rem 2rem' }}>
                🔄 สับสำรับใหม่สำหรับรอบถัดไป
              </button>
            )}
          </div>
        )}
      </div>

      {/* Drawn History Section */}
      {drawnHistory.length > 0 && (
        <div style={{ width: '100%' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>
            ประวัติการจับไพ่ (RECENT DRAWS)
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {drawnHistory.slice(-10).reverse().map((c, idx) => {
              const red = c.suit === '♥' || c.suit === '♦';
              return (
                <div 
                  key={c.id + '-' + idx} 
                  style={{ 
                    minWidth: '45px', 
                    padding: '0.35rem', 
                    background: '#fff', 
                    borderRadius: '6px', 
                    color: red ? '#d32f2f' : '#212121', 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    border: '1px solid var(--gold)',
                    flexShrink: 0
                  }}
                >
                  {c.rank} {c.suit}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGame;
