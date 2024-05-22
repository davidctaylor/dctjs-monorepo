import { useRef } from 'react';

import { BackgroundImage } from '../background-image/background-image';
import { SectionMusic } from '../section-music/section-music';
import { SectionAbout } from '../section-about/section-about';

import {
  PageMainProvider,
} from './page-main-provider';
import './page-main.css';

/* eslint-disable-next-line */
export interface PageMainProps {}

export const PageMain = (props: PageMainProps) => {
  const sectionMusicRef = useRef<HTMLDivElement>(null);
  /* eslint-disable-next-line */
  const onLoadComplete = () => {};

  return (
    <PageMainProvider scrollRef={sectionMusicRef}>
      <main ref={sectionMusicRef} className="overflow-scroll w-full h-full">
        {/* <BackgroundText /> */}
        <BackgroundImage onLoadComplete={onLoadComplete}></BackgroundImage>

        <div className="min-h-[calc(100%-80px)]"></div>
        <div className="abc flex flex-col items-center justify-center w-full gap-y-16 ">
          <SectionMusic/>
          <SectionAbout/>
        </div>
        <div className="min-h-[50%] bg-black"></div>
      </main>
    </PageMainProvider>
  );
};
