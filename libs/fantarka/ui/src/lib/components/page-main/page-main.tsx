import { FixedHeader } from '@dctjs-monorepo/shared-ui';

import { BackgroundImage } from '../background-image/background-image';
import { BackgroundText } from '../background-text/background-text';
import { SectionMusic } from '../section-music/section-music';
import { SectionAbout } from '../section-about/section-about';
import { usePageMainReducer, PageMainActions } from './page-main-reducer';

import ErrorBoundary2 from './test'

import './page-main.css';

/* eslint-disable-next-line */
export interface PageMainProps {}

export const PageMain = (props: PageMainProps) => {
  const [state, dispatch] = usePageMainReducer();

  return (
    <main className="w-full">
      <FixedHeader
        title="Fantarka"
        navOptions={[
          { link: '#about', name: 'About' },
          { link: '#music', name: 'Music' },
        ]}
      />
      <BackgroundImage
        imageUrl={state.tracks[state.activeTrack].artwork_url}
        totalPixelContainers={100}
      />
      {state.titlesActive && (
        <BackgroundText inputText={state.tracks[state.activeTitle].title} />
      )}

      <div className="absolute top-[calc(100%-60px)] flex flex-col items-center justify-center w-full gap-y-16 pb-8 abc">
        <SectionMusic
          activeTrack={state.activeTrack}
          playerActive={state.playerActive}
          tracks={state.tracks}
          playTrack={(idx: number) =>
            dispatch({ type: PageMainActions.ACTIVE_TRACK, payload: idx })
          }
        />
        <SectionAbout />
      </div>
    </main>
  );
};
