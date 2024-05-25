import { createContext, Dispatch, RefObject, useReducer } from 'react';

import { useAudioPlayer, useInterval } from '@dctjs-monorepo/shared-ui';

import { Track } from '../../interfaces';
import { FANTARKA_TRACKS } from './page-tracks';

export type TitlesRefreshType = 'active' | 'disabled' | 'pending';

export enum ActiveTitleActions {
  ACTIVE_TRACK,
  NEXT_TITLE,
  PREVIOUS_TITLE,
  REFRESH_ACTIVE,
  PLAYER_ACTIVE,
}

interface ActiveTitleAction {
  type: ActiveTitleActions;
  payload: undefined | unknown;
}

interface ActiveTitleState {
  activeTitle: number;
  activeTrack: number;
  playerActive: boolean;
  refreshActive: TitlesRefreshType;
  tracks: Track[];
}

export const PageMainContext = createContext<ActiveTitleState | null>(null);
export const PageMainDispatchContext =
  createContext<Dispatch<ActiveTitleAction> | null>(null);

const initialState: ActiveTitleState = {
  activeTitle: 0,
  activeTrack: 1,
  playerActive: false,
  refreshActive: 'active',
  tracks: FANTARKA_TRACKS,
};

export const PageMainProvider = ({
  children,
}: {
  children: React.ReactNode;
  scrollRef?: RefObject<HTMLElement | null>;
}) => {
  const [state, dispatch] = useReducer(pageTitleReducer, initialState);

  useAudioPlayer(
    false,
    { state: state.playerActive ? 'play' : 'pause' },
    state.tracks[state.activeTrack].audioUrl,
    () => dispatch({ type: ActiveTitleActions.PLAYER_ACTIVE, payload: false })
  );

  // useInterval(
  //   () => {
  //     if (state.refreshActive === 'pending') {
  //       dispatch({ type: ActiveTitleActions.REFRESH_ACTIVE, payload: 'active' });
  //       dispatch({ type: ActiveTitleActions.NEXT_TITLE, payload: undefined });
  //     } else {
  //       dispatch({ type: ActiveTitleActions.NEXT_TITLE, payload: undefined });
  //     }
  //   },
  //   state.playerActive || state.refreshActive !== 'active' ? null : 1000 * 5
  // );

  return (
    <PageMainContext.Provider value={state}>
      <PageMainDispatchContext.Provider value={dispatch}>
        {children}
      </PageMainDispatchContext.Provider>
    </PageMainContext.Provider>
  );
};

const pageTitleReducer = (
  state: ActiveTitleState,
  action: ActiveTitleAction
) => {
  switch (action.type) {
    case ActiveTitleActions.ACTIVE_TRACK: {
      const activeTrack = action.payload as number;
      const titlesActive = 'disabled' as TitlesRefreshType;
      let playerActive = state.activeTrack !== activeTrack;

      if (state.activeTrack === activeTrack) {
        playerActive = !state.playerActive;
      } else {
        playerActive = true;
      }
      return {
        ...state,
        activeTitle: activeTrack,
        activeTrack,
        playerActive,
        titlesActive,
      };
    }

    case ActiveTitleActions.NEXT_TITLE: {
      let activeTitle = state.activeTitle;
      activeTitle =
        activeTitle + 1 < FANTARKA_TRACKS.length ? activeTitle + 1 : 0;
      return {
        ...state,
        activeTitle,
        activeTrack: state.playerActive ? activeTitle : state.activeTrack,
      };
    }

    case ActiveTitleActions.PREVIOUS_TITLE: {
      let activeTitle = state.activeTitle;
      activeTitle = activeTitle - 1 > 0 ? activeTitle - 1 : 0;
      return {
        ...state,
        activeTitle,
        activeTrack: state.playerActive ? activeTitle : state.activeTrack,
      };
    }

    case ActiveTitleActions.PLAYER_ACTIVE:
      return { ...state, playerActive: action.payload as boolean };

    case ActiveTitleActions.REFRESH_ACTIVE:
      return { ...state, refreshActive: action.payload as TitlesRefreshType };

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};
