'use client';

import { useState, type CSSProperties } from 'react';
import { PHOTOS } from '@/lib/data';

export default function Photos() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="photos">
      <div className="container">
        <div className="eyebrow">06 / Film roll</div>
        <h2 className="section-title">
          A little <em className="serif">photo wall</em>.
        </h2>
        <p style={{ maxWidth: 560, color: 'var(--ink-soft)', margin: '12px 0 48px' }}>
          Mostly shot on a Pentax K1000, occasionally phone. Click any polaroid to enlarge — hover to unpin from the wall.
        </p>

        <div className="polaroids">
          {PHOTOS.map((p, i) => (
            <button
              key={i}
              className="polaroid"
              style={
                {
                  '--rot': `${p.rot}deg`,
                  '--tint': p.tint,
                  zIndex: i,
                } as CSSProperties
              }
              onClick={() => setLightbox(i)}
              aria-label={`Open photo: ${p.caption}`}
            >
              <div className="polaroid-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.caption}
                  loading="lazy"
                  style={{ objectPosition: p.objectPosition }}
                />
              </div>
              <div className="polaroid-cap">{p.caption}</div>
              <div className="tape" aria-hidden />
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <button className="lb-close" onClick={() => setLightbox(null)} aria-label="Close">
            ×
          </button>
          <button
            className="lb-nav lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length);
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          <div className="lb-frame" onClick={(e) => e.stopPropagation()}>
            <div className="lb-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTOS[lightbox].src}
                alt={PHOTOS[lightbox].caption}
                style={{ objectPosition: PHOTOS[lightbox].objectPosition }}
              />
            </div>
            <div className="lb-cap serif">{PHOTOS[lightbox].caption}</div>
          </div>
          <button
            className="lb-nav lb-next"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % PHOTOS.length);
            }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}

      <style jsx>{`
        .polaroids {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          padding: 20px 0;
        }
        .polaroid {
          appearance: none;
          border: 0;
          padding: 14px 14px 42px;
          background: #f5f1ea;
          border-radius: 4px;
          cursor: pointer;
          position: relative;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3);
          transform: rotate(var(--rot)) translateY(0);
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease;
          text-align: left;
        }
        .polaroid:hover {
          transform: rotate(0deg) translateY(-8px) scale(1.03);
          box-shadow: 0 30px 60px rgba(167, 139, 250, 0.3), 0 4px 10px rgba(0, 0, 0, 0.4);
          z-index: 20 !important;
        }
        .polaroid-img {
          aspect-ratio: 1 / 1;
          border-radius: 2px;
          overflow: hidden;
          background: var(--tint);
        }
        .polaroid-img :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .lb-img :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .polaroid-cap {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 12px;
          text-align: center;
          font-family: 'Caveat', 'Instrument Serif', cursive;
          font-style: italic;
          font-size: 18px;
          color: #4a4538;
        }
        .tape {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%) rotate(-4deg);
          width: 60px;
          height: 16px;
          background: rgba(234, 210, 140, 0.5);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 500;
          background: rgba(20, 18, 14, 0.75);
          backdrop-filter: blur(10px);
          display: grid;
          place-items: center;
          padding: 24px;
          animation: lbIn 0.3s ease;
        }
        @keyframes lbIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .lb-frame {
          background: #f5f1ea;
          padding: 18px 18px 52px;
          max-width: 520px;
          width: 100%;
          border-radius: 6px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
          animation: lbFrame 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes lbFrame {
          from {
            transform: scale(0.9) rotate(-2deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotate(0);
            opacity: 1;
          }
        }
        .lb-img {
          aspect-ratio: 1 / 1;
          border-radius: 2px;
          overflow: hidden;
        }
        .lb-cap {
          text-align: center;
          font-size: 28px;
          margin-top: 16px;
          font-style: italic;
          color: #1a1814;
        }
        .lb-close,
        .lb-nav {
          position: absolute;
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
          border: 0.5px solid rgba(255, 255, 255, 0.25);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          font-size: 22px;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: background 0.2s;
        }
        .lb-close {
          top: 20px;
          right: 20px;
        }
        .lb-close:hover,
        .lb-nav:hover {
          background: rgba(255, 255, 255, 0.22);
        }
        .lb-prev {
          left: 24px;
          top: 50%;
          transform: translateY(-50%);
        }
        .lb-next {
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
        }
        @media (max-width: 880px) {
          .polaroids {
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
          }
        }
        @media (max-width: 560px) {
          .polaroids {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
