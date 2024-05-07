import { useEffect, useReducer, useState } from 'react';

import { useAudioPlayer, useInterval, useScrollPosition } from '@dctjs-monorepo/shared-ui';
import { Track, LOCAL_TRACKS } from '../../interfaces';

interface PageMainState {
  activeTitle: number;
  activeTrack: number;
  playerActive: boolean;
  titlesActive: boolean;
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
    titlesActive: true,
    tracks: [...LOCAL_TRACKS],
  });

  const [scrollPositionActive, setEnableSrollPosition] =
    useState<boolean>(true);
  const scrollPosition = useScrollPosition(scrollPositionActive);

  useEffect(() => {
    if (scrollPosition.y > window.innerHeight / 3) {
      dispatch({ type: PageMainActions.TITLES_ACTIVE, payload: false });
      setEnableSrollPosition(false);
    }
  }, [scrollPosition]);

  useInterval(
    () => {
      dispatch({ type: PageMainActions.NEXT_TITLE, payload: undefined });
    },
    state.titlesActive ? 1000 * 5 : null
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
      let playerActive = state.activeTrack !== activeTrack;
      let titlesActive = state.titlesActive;
      if (state.activeTrack === activeTrack) {
        playerActive = !state.playerActive;
      } else {
        playerActive = true;
        titlesActive = false;
      }
      return { ...state, activeTrack, playerActive, titlesActive };
    }

    case PageMainActions.PLAYER_ACTIVE:
      return { ...state, playerActive: action.payload as boolean };

    case PageMainActions.TITLES_ACTIVE:
      return { ...state, titlesActive: action.payload as boolean };

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};
