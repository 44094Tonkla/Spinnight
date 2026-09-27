import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const Home = () => {
  return (
    <div style={{ 
        textAlign: 'center', 
        padding: '4rem 1rem', 
        background: 'var(--bg-primary)', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        color: 'var(--text-main)',
        position: 'relative',
        overflow: 'hidden'
      }}>
      
      {/* Background decoration */}
      <img src="/images/home/ประตู.jpg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1, zIndex: 0 }} />
      
      <header style={{ position: 'relative', zIndex: 1, marginTop: '2rem' }}>
        <p style={{ color: 'var(--text-muted)', letterSpacing: '4px', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.9rem' }}>✦ SOCIAL PARTY GAME ✦</p>
        <img src="/images/home/แก้วไวน์หน้าhome.jpg" style={{ height: '200px', marginBottom: '1rem', borderRadius: '50%' }} alt="Wine Glass" />
        <h1 style={{ color: 'var(--text-main)', fontSize: '5rem', marginBottom: '1rem', fontWeight: '900', textTransform: 'uppercase' }}>SPINNIGHT</h1>
        <h2 style={{ color: 'var(--text-main)', fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '300' }}>WHO'S GETTING PICKED TONIGHT?</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>Create a room, invite your friends, and let fate decide who gets picked.</p>
      </header>
      
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem' }}>
        <Link to="/create-room" className="primary-button" style={{ textDecoration: 'none' }}>CREATE ROOM</Link>
        <Link to="/join-room" className="secondary-button" style={{ textDecoration: 'none' }}>JOIN ROOM</Link>
      </div>

      {/* How it works section */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: '800px', width: '100%', marginBottom: '4rem' }}>
        <h3 style={{ marginBottom: '2rem', color: 'var(--danger-gold)', textTransform: 'uppercase', letterSpacing: '2px' }}>How it works</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}>
          <div className="glass-card">
            <p>01</p>
            <p>CREATE A ROOM</p>
          </div>
          <div className="glass-card">
            <p>02</p>
            <p>GATHER YOUR CREW</p>
          </div>
          <div className="glass-card">
            <img src="/images/home/วงล้อ.png" style={{ width: '50px', marginBottom: '0.5rem' }} alt="Spin" />
            <p>03</p>
            <p>SPIN THE NIGHT</p>
          </div>
          <div className="glass-card">
            <img src="/images/home/ลูกเต๋า.png" style={{ width: '50px', marginBottom: '0.5rem' }} alt="Dice" />
            <p>04</p>
            <p>FACE YOUR FATE</p>
          </div>
        </div>
      </section>

      <p style={{ position: 'relative', zIndex: 1, color: 'var(--text-muted)', fontSize: '0.9rem' }}>No sign-up · Free to play · 2–12 Players</p>
    </div>
  );
};

export default Home;
