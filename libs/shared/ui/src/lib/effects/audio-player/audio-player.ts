import { useState } from 'react';
import { useEffect, useRef } from 'react';

type AudioPlayerStateType = 'play' | 'pause';

export const useAudioPlayer = (
  autoPlay: boolean,
  audioState: { state: AudioPlayerStateType },
  streamURL: string,
  onComplete: () => void
) => {
  const [audioElement] = useState<HTMLAudioElement>(new Audio());
  const audioInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (!audioElement) {
      return;
    }

    if (!audioInitialized.current) {
      audioInitialized.current = true;
      audioElement.autoplay = autoPlay || false;
      audioElement.onended = onComplete;
    }

    if (audioState.state === 'play') {
      audioElement.pause();
      audioElement.currentTime = 0;
      audioElement.src = streamURL;
      audioElement.play().catch((e) => {
        console.log(`play error ${streamURL} ` , e);
        onComplete();
      });
    } else {
      audioElement.pause();
    }
  }, [audioElement, autoPlay, audioState, streamURL, onComplete]);
};
