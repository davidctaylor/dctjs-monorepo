import React from 'react';
import {
  DctCard,
  DctRipple,
  DctCardContent,
} from '@dctjs/react';
import { MdPlayCircle, MdStopCircle } from 'react-icons/md';
import { Audio } from 'react-loader-spinner';

import { Track } from '../../interfaces';
import './section-music.css';

interface SectionMusicProps {
  activeTrack: number;
  playerActive: boolean;
  tracks: Track[];
  playTrack: (idx: number) => void;
}

export const SectionMusic: React.FC<SectionMusicProps> = ({activeTrack, playerActive, tracks, playTrack}) => {
  const handleClick = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    playTrack(idx);
  };
  
  const Cards = () =>
    tracks.map((track: Track, idx: number) => {
      return (
        <DctCard
          className="border min-w-[350px] hover:border-[#317caa] text-red-50 focus-within:text-black focus:text-black"
          border="outlined"
          href="#"
          onClick={(event) => handleClick(event, idx)}
          key={track.title}
        >
          <DctRipple />
          <DctCardContent>
            <div className="flex flex-row items-center justify-start gap-x-4">
              {activeTrack === idx && playerActive && (<MdStopCircle size={35} />)}
              {(activeTrack !== idx || !playerActive) && (<MdPlayCircle size={35} />)}
              <p>{track.title}</p>
              {activeTrack === idx && playerActive && (
                <Audio
                  height="30"
                  width="30"
                  color="#317caa"
                  ariaLabel="audio-loading"
                  wrapperClass="ml-auto"
                  // visible={true}
                />
              )}
            </div>
          </DctCardContent>
        </DctCard>
      );
    });

  return (
    <section>
      <h2 className="font-sans text-center text-white text-2xl pt-4 pb-8">
        Music
      </h2>
      <div className="flex flex-col justify-center gap-8">
        <Cards />
      </div>
    </section>
  );
};
