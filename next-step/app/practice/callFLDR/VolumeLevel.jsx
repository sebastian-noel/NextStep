import React, { useEffect, useState } from 'react';

// Lightweight pulsing radial background for assistant speech state.
// Props:
// - isSpeaking: boolean
// - volume: 0..1 (optional, used to modulate intensity)
const VolumeLevel = ({ isSpeaking = false, volume = 0 }) => {
  const [pulse, setPulse] = useState(1);

  useEffect(() => {
    let raf = 0;
    let t = 0;
    if (isSpeaking) {
      const loop = () => {
        t += 0.02; // slower increment for lighter pulsing
        // very subtle oscillation around 1.0 (small amplitude)
        const p = 1.0 + Math.sin(t) * 0.03; // +/- 0.03
        setPulse(p);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } else {
      // smoothly decay the pulse to 1
      setPulse(1);
    }
    return () => cancelAnimationFrame(raf);
  }, [isSpeaking]);

  // modulation by volume for subtle intensity change (brighter now)
  const intensity = Math.max(0.06, Math.min(0.7, 0.08 + (volume || 0) * 0.52));

  // make the radial circle REALLY wide so its edges are offscreen; larger base
  const size = `${Math.round(260 * pulse + 340)}%`;

  const style = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 0,
  };

  const circleStyle = {
    position: 'fixed',
    top: 0,
    left: '50%',
    width: '260vw',
    height: '200vh',
    marginLeft: '-130vw', // center by negative half width
    borderRadius: '50%',
    transform: `translateX(0) scale(${pulse})`,
    transition: 'width 640ms ease, height 640ms ease, transform 640ms ease, opacity 720ms ease',
    // radial centered in the element (element center corresponds to viewport bottom)
    background: `radial-gradient(circle at 50% 50%, rgba(34,197,94,${Math.min(1, intensity)}) 0%, rgba(16,185,129,${Math.max(0, intensity - 0.05)}) 8%, rgba(34,197,94,0.045) 28%, rgba(8,12,20,0) 60%)`,
    opacity: isSpeaking ? 0.85 : 0,
    filter: isSpeaking ? 'blur(36px) saturate(108%)' : 'blur(12px) saturate(90%)',
    pointerEvents: 'none',
    zIndex: 0,
  };

  return (
    <div style={style} aria-hidden>
      <div style={circleStyle} />
    </div>
  );
};

export default VolumeLevel;