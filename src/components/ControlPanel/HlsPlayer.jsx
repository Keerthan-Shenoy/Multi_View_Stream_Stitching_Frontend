import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

export function HlsPlayer({ src, width = '100%', height = 360 }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // Native HLS support (Safari)
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      return;
    }

    // Use hls.js for other browsers
    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        // NOTE: you can fine tune loader, frag loading, etc. if needed
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (event, data) => {
        // For debugging you could console.warn the err
        // console.warn('HLS error', event, data);
      });

      return () => {
        try {
          hls.destroy();
        } catch (e) {
          // ignore
        }
      };
    }

    // Last resort: set src and let the browser try
    video.src = src;
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      width={width}
      height={height}
      style={{ backgroundColor: '#000', borderRadius: 6 }}
      crossOrigin="anonymous"
    />
  );
}

export default HlsPlayer;
