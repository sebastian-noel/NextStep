import React, { useRef, useEffect } from 'react';

// Improved, optimized canvas visualizer with smoothing and fewer allocations
const VolumeLevel = ({ volume = 0, isSpeaking = false }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = canvas.clientWidth;
    let h = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const bands = 120; // ALOT more bands => very thin bars
  const baseHue = 140; // start around green (will shift slightly toward yellow-green)

    // Precompute band positions and phases
    const bandPositions = new Array(bands);
    const phases = new Array(bands);
    for (let i = 0; i < bands; i++) {
      phases[i] = Math.random() * Math.PI * 2;
    }

  let perBand = new Array(bands).fill(0); // smoothed energies
  let smoothedVol = 0; // smoothed input volume

  // smoothing: separate attack (rise) and release (fall) factors
  // Larger attack -> faster rise; smaller release -> slower fall
  const attack = 0.28; // faster rise (easier to reach top)
  const release = 0.035; // slower fall
  const topThreshold = 0.94; // when a bar is near the top, decay extra slowly
  const topRelease = 0.012; // very slow decay when at top

  // amplify bars so they go up a lot more visibly
  const amplify = 1.8;

    const computePositions = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      const bandW = w / bands;
      for (let i = 0; i < bands; i++) {
        const x = i * bandW + bandW * 0.12;
        const width = Math.max(1, bandW * 0.76);
        bandPositions[i] = { x, width };
      }
    };

    computePositions();

    const onResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      computePositions();
    };
    window.addEventListener('resize', onResize);

    let t = 0;

    const lerp = (a, b, amt) => a + (b - a) * amt;

    const render = () => {
      t += 0.018;

  // smooth the input volume so the visuals don't jitter
  const targetVol = Math.max(0, Math.min(1, volume));
  smoothedVol = lerp(smoothedVol, targetVol, 0.09);

      // background
      ctx.clearRect(0, 0, w, h);
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, 'rgba(10,12,25,0.66)');
      bg.addColorStop(1, 'rgba(4,6,12,0.88)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // drawing parameters
      const speakingBoost = isSpeaking ? 1.25 : 1.0;

      // subtle shadow/glow for all bars - set once per frame
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(120, 95, 255, 0.12)';

      for (let i = 0; i < bands; i++) {
        const freqFactor = Math.pow((i + 1) / bands, 1.4);

        const noise = (Math.sin(t * (0.8 + freqFactor * 1.6) + phases[i]) + 1) * 0.5;
        let energyTarget = smoothedVol * speakingBoost * (0.38 + noise * 0.62) * (0.72 + freqFactor * 0.68);
        energyTarget = Math.max(0, Math.min(1, energyTarget * amplify));

        // smooth per-band energy with different attack/release for nicer easing
        if (energyTarget > perBand[i]) {
          perBand[i] = perBand[i] + (energyTarget - perBand[i]) * attack; // faster rise
        } else {
          // if a bar is near the top, decay extra slowly so it eases down
          const r = perBand[i] > topThreshold ? topRelease : release;
          perBand[i] = perBand[i] + (energyTarget - perBand[i]) * r; // slower fall
        }

        const { x, width } = bandPositions[i];
        const barH = perBand[i] * h * (0.78 - freqFactor * 0.2);
        const y = h - barH;

  // color using HSL green palette
  // green -> yellow-green gradient: hue ~140 -> ~80 across frequencies
  const hue = baseHue - freqFactor * 58; // 140 -> ~82
  const light = 28 + perBand[i] * 50;
  const sat = 62 + perBand[i] * 28;
  ctx.fillStyle = `hsl(${Math.round(hue)} ${Math.round(sat)}% ${Math.round(light)}%)`;

  // draw thin rounded rect (optimized path)
  const r = Math.min(4, width / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + barH - r);
  ctx.quadraticCurveTo(x + width, y + barH, x + width - r, y + barH);
  ctx.lineTo(x + r, y + barH);
  ctx.quadraticCurveTo(x, y + barH, x, y + barH - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();

  // subtle top highlight for depth
  ctx.fillStyle = `rgba(255,255,255,${0.02 + perBand[i] * 0.12})`;
  ctx.fillRect(x, Math.max(0, y + barH * 0.018), width, Math.max(1, Math.min(2, barH * 0.035)));
      }

  rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [volume, isSpeaking]);

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default VolumeLevel;