import React, { useContext, useRef } from 'react';
import { DctCard, DctRipple, DctCardContent } from '@dctjs/react';
import { MdPlayCircle, MdStopCircle } from 'react-icons/md';
import { Audio } from 'react-loader-spinner';

import { Track } from '../../interfaces';
import './section-music.css';

import {
  ActiveTitleActions,
  PageMainContext,
  PageMainDispatchContext,
} from '../page-main/page-main-provider';

/* eslint-disable-next-line */
interface SectionMusicProps {}

interface CardProps {
  track: Track;
  idx: number;
  activeTrack: number;
  playerActive: boolean;
}

const Card: React.FC<CardProps> = ({
  activeTrack,
  track,
  playerActive,
  idx,
}) => {
  const imageRef = useRef<HTMLDctCardElement | null>(null);
  const dispatch = useContext(PageMainDispatchContext);

  return (
    <DctCard
      className="border hover:border-fantarka-blue focus-within:text-black focus:text-black"
      border="outlined"
      onClick={() => {
        dispatch &&
          dispatch({ type: ActiveTitleActions.ACTIVE_TRACK, payload: idx });
      }}
      ref={imageRef}
    >
      <DctRipple />
      <DctCardContent>
        <div className="flex flex-row items-center justify-between gap-x-4 md:m-w-[410px]">
          {activeTrack === idx && playerActive && (
            <div className="w-[50px] h-[50px]">
              <MdStopCircle size={50} />
            </div>
          )}
          {(activeTrack !== idx || !playerActive) && (
            <div className="w-[50px] h-[50px]">
              <MdPlayCircle size={50} />
            </div>
          )}
          <p className="text-xl leading-5 text-start pt-[3px]">{track.title}</p>
          {activeTrack === idx && playerActive && (
            <Audio
              height="30"
              width="30"
              color="#317caa"
              ariaLabel="audio-loading"
              wrapperClass="ml-auto"
            />
          )}
          {(activeTrack !== idx || (activeTrack === idx && !playerActive)) && (
            <div className="flex-1 min-w-[30px] w-[30px] h-[30px]"></div>
          )}
        </div>
      </DctCardContent>
    </DctCard>
  );
};

export const SectionMusic: React.FC<SectionMusicProps> = () => {
  const pageCtx = useContext(PageMainContext);

  const Cards = () =>
    pageCtx?.tracks.map((track: Track, idx: number) => (
      <Card
        key={track.title}
        track={track}
        idx={idx}
        activeTrack={pageCtx.activeTrack}
        playerActive={pageCtx.playerActive}
      />
    ));

  return (
    <section id="music" className="flex flex-col justify-center gap-y-8 px-4">
      <h2 className="font-sans text-center text-white text-2xl">Music</h2>
      <Cards />
    </section>
  );
};
