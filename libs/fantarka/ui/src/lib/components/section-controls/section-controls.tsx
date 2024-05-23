import React, { useContext } from 'react';
import { DctButton } from '@dctjs/react';
import { MdPlayCircle, MdSkipNext, MdSkipPrevious, MdStopCircle } from 'react-icons/md';
import {
  ActiveTitleActions,
  PageMainContext,
  PageMainDispatchContext,
} from '../page-main/page-main-provider';

/* eslint-disable-next-line */
interface SectionControlsProps {}

export const SectionContols: React.FC<SectionControlsProps> = () => {
  const pageCtx = useContext(PageMainContext);
  const dispatch = useContext(PageMainDispatchContext);

  const len: number = pageCtx?.tracks.length || 0;

  return (
    <section className="flex justify-center pt-6 gap-x-4 pointer-events-auto">
      <DctButton
        ariaLabel="Previous track"
        className="w-[50px] [&>*:hover]:outline-fantarka-blue [&>*:hover]:outline [&>*]:rounded-full [&>*]:outline-offset-4 [&>*]:outline-1"
        iconButton={true}
        disabled={pageCtx?.activeTitle === 0}
        ripple={true}
        buttonStyle="text"
        onClick={() => {
          dispatch && dispatch({ type: ActiveTitleActions.PREVIOUS_TITLE, payload: null });
          dispatch && dispatch({ type: ActiveTitleActions.REFRESH_ACTIVE, payload: 'disabled' })
        }}
      >
        <MdSkipPrevious size={50} />
      </DctButton>
      <DctButton
        ariaLabel="Play track"
        className="w-[50px] [&>*:hover]:outline-fantarka-blue [&>*:hover]:outline [&>*]:rounded-full [&>*]:outline-offset-4 [&>*]:outline-1"
        iconButton={true}
        ripple={true}
        buttonStyle="text"
        onClick={() => {
          dispatch && dispatch({ type: ActiveTitleActions.ACTIVE_TRACK, payload: pageCtx?.activeTitle })
        }}
      >
        {pageCtx?.playerActive && (<MdStopCircle size={50} />)}
        {!pageCtx?.playerActive && (<MdPlayCircle size={50} />)}
      </DctButton>

      <DctButton
        ariaLabel="Next track"
        className="w-[50px] [&>*:hover]:outline-fantarka-blue [&>*:hover]:outline [&>*]:rounded-full [&>*]:outline-offset-4 [&>*]:outline-1"
        iconButton={true}
        disabled={pageCtx?.activeTitle === len - 1}
        ripple={true}
        buttonStyle="text"
        onClick={() => {
          dispatch && dispatch({ type: ActiveTitleActions.NEXT_TITLE, payload: null });
          dispatch && dispatch({ type: ActiveTitleActions.REFRESH_ACTIVE, payload: 'disabled' })
        }}
      >
        <MdSkipNext size={50} />
      </DctButton>
    </section>
  );
};
