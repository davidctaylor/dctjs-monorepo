import { useRef } from 'react';

import { BackgroundImage } from '../background-image/background-image';
import { SectionMusic } from '../section-music/section-music';
import { SectionAbout } from '../section-about/section-about';
import { PageMainProvider } from './page-main-provider';
import './page-main.css';

/* eslint-disable-next-line */
export interface PageMainProps {}

export const PageMain = (props: PageMainProps) => {
  const sectionMusicRef = useRef<HTMLDivElement>(null);
  /* eslint-disable-next-line */
  const onLoadComplete = () => {};

  return (
    <PageMainProvider scrollRef={sectionMusicRef}>
      <main ref={sectionMusicRef} className="overflow-scroll screen-w screen-h">
        <BackgroundImage onLoadComplete={onLoadComplete}></BackgroundImage>
        <div className="gradient flex flex-col items-center justify-center w-full gap-y-16 absolute left-0 top-[calc(100%-60px)] pb-12">
          <SectionMusic />
          <SectionAbout />
        </div>
      </main>
    </PageMainProvider>
  );
};
