import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { DctButton, DctCard, DctCardContent } from '@dctjs/react';

import {
  ActiveTitleActions,
  PageMainContext,
  PageMainDispatchContext,
} from '../page-main/page-main-provider';
import { MdPlayCircle, MdStopCircle } from 'react-icons/md';

/* eslint-disable-next-line */
interface SectionVideoProps {}

export const SectionVideo: React.FC<SectionVideoProps> = () => {
  const pageCtx = useContext(PageMainContext);
  const dispatch = useContext(PageMainDispatchContext);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (pageCtx?.playerActive) {
      setVideoPlaying(() => false);
    }
  }, [pageCtx?.playerActive]);

  return (
    <section
      id="video"
      className="flex flex-col justify-center gap-y-8 px-4 text-white"
    >
      <h2 className="font-sans text-center text-2xl">Video</h2>
      <div className="flex flex-col">
        <DctCard
          className="border hover:border-fantarka-blue focus-within:text-black focus:text-black pl-0"
          border="outlined"
          ripple={true}
        >
          <DctCardContent>
            <div className="flex flex-row items-center justify-start h-[300px] pl-0">
              <ReactPlayer
                url="/assets/video/get-funky-promo.mp4"
                width="100%"
                height="100%"
                playing={videoPlaying}
                onEnded={() => setVideoPlaying(!videoPlaying)}
              />
              <div className="flex flex-col md:flex-row gap-4">
                <DctButton
                  ariaLabel="Play track"
                  className="w-[50px] [&>*:hover]:outline-fantarka-blue [&>*:hover]:outline [&>*]:rounded-full [&>*]:outline-offset-4 [&>*]:outline-1"
                  iconButton={true}
                  ripple={true}
                  buttonStyle="text"
                  onClick={() => {
                    // videoPlaying.current = !videoPlaying.current;
                    setVideoPlaying(!videoPlaying);
                    dispatch &&
                      dispatch({
                        type: ActiveTitleActions.PLAYER_ACTIVE,
                        payload: false,
                      });
                  }}
                >
                  {videoPlaying && <MdStopCircle size={50} />}
                  {!videoPlaying && <MdPlayCircle size={50} />}
                </DctButton>
                <p className="text-xl leading-5 text-start pt-[3px]">
                  Get Funky
                </p>
              </div>
            </div>
          </DctCardContent>
        </DctCard>
      </div>
    </section>
  );
};
