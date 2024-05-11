import { useEffect, useReducer, useState } from 'react';

import { useAudioPlayer, useInterval, useScrollPosition } from '@dctjs-monorepo/shared-ui';
import { Track } from '../../interfaces';

const LOCAL_TRACKS: Track[] = [
  {
    title: 'Get Funky',
    artwork_url: '/assets/images/get-funky-final.webp',
    stream_url: '/assets/audio/wave/get-funky-2023.wav',
    description: 'Ambient track',
  },
  {
    title: 'Above the clouds',
    artwork_url: '/assets/images/above-the-clouds.webp',
    stream_url: '/assets/audio/above-the-clouds-2023.wav',
    description: 'Ambient track',
  },
  {
    title: 'Give you love',
    artwork_url: '/assets/images/give-you-love.webp',
    stream_url: '/assets/audio/give-you-love-2023.wav',
    description: 'Ambient track',
  },
  {
    title: 'Herm',
    artwork_url: '/assets/images/fantarka.webp',
    stream_url: '/assets/audio/herm.ma4',
    description: 'Ambient track',
  },
  {
    title: 'So good',
    artwork_url: '/assets/images/so-good.webp',
    stream_url: '/assets/audio/so-good.wav',
    description: 'Ambient track',
  },
  {
    title: 'Solarium',
    artwork_url: '/assets/images/solar.webp',
    stream_url: '/assets/audio/solarium.ma4',
    description: 'Uplifting Old School style dance track with a modern twist!',
  },
];

type TitlesActiveType = 'active' | 'disabled' | 'pending';
interface PageMainState {
  activeTitle: number;
  activeTrack: number;
  playerActive: boolean;
  titlesActive: TitlesActiveType,
  tracks: Track[];
}

export enum PageMainActions {
  NEXT_TITLE,
  ACTIVE_TRACK,
  PLAYER_ACTIVE,
  TITLES_ACTIVE,
}

interface PageMainAction {
  type: PageMainActions;
  payload: undefined | unknown;
}

export const usePageMainReducer = (): [
  PageMainState,
  React.Dispatch<PageMainAction>
] => {
  const [state, dispatch] = useReducer(pageMainReducer, {
    activeTitle: 0,
    activeTrack: 0,
    playerActive: false,
    titlesActive: 'pending',
    tracks: [...LOCAL_TRACKS],
  });

  const [scrollPositionActive, setEnableSrollPosition] =
    useState<boolean>(true);
  const scrollPosition = useScrollPosition(scrollPositionActive);

  useEffect(() => {
    if (scrollPosition.y > window.innerHeight / 3) {
      dispatch({ type: PageMainActions.TITLES_ACTIVE, payload: 'disabled' });
      setEnableSrollPosition(false);
    }
  }, [scrollPosition]);

  useInterval(
    () => {
      dispatch({ type: PageMainActions.NEXT_TITLE, payload: undefined });
    },
    state.titlesActive === 'active' ? 1000 * 5 : null
  );

  useAudioPlayer(
    false,
    { state: state.playerActive ? 'play' : 'pause' },
    state.tracks[state.activeTrack].stream_url,
    () => dispatch({ type: PageMainActions.PLAYER_ACTIVE, payload: false }));

  return [state, dispatch];
};

const pageMainReducer = (state: PageMainState, action: PageMainAction) => {
  
  switch (action.type) {
    case PageMainActions.NEXT_TITLE: {
      let activeTitle = state.activeTitle;
      activeTitle = activeTitle + 1 < state.tracks.length ? activeTitle + 1 : 0;
      return { ...state, activeTitle };
    }

    case PageMainActions.ACTIVE_TRACK: {
      const activeTrack = action.payload as number;
      const titlesActive = 'disabled' as TitlesActiveType;
      let playerActive = state.activeTrack !== activeTrack;

      if (state.activeTrack === activeTrack) {
        playerActive = !state.playerActive;
      } else {
        playerActive = true;
      }
      return { ...state, activeTrack, playerActive, titlesActive };
    }

    case PageMainActions.PLAYER_ACTIVE:
      return { ...state, playerActive: action.payload as boolean };

    case PageMainActions.TITLES_ACTIVE:
      return state.titlesActive === 'disabled' ? state : { ...state, titlesActive: action.payload as TitlesActiveType };

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};
