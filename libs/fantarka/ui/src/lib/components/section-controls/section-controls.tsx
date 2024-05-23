import React from 'react';
import { DctButton, DctRipple } from '@dctjs/react';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

import { InstagramSVG, SoundCloudSVG } from '@dctjs-monorepo/shared-ui';
import { MdPlayCircle, MdSkipNext, MdSkipPrevious } from 'react-icons/md';

const ICON_SIZE = 32;
const SHARE_URL = 'http://www.fantarka.com/';

/* eslint-disable-next-line */
interface SectionControlsProps {}

export const SectionContols: React.FC<SectionControlsProps> = () => {
  return (
    <section className="flex justify-center pt-6 gap-x-4">
      <DctButton
        ariaLabel="Open link to the Fantarka page on the Instagram website"
        iconButton={true}
        ripple={true}
        buttonStyle="text"
        onClick={() => {}}
      >
        <MdSkipPrevious size={50} />
      </DctButton>
      <DctButton
        ariaLabel="Open link to the Fantarka page on the Instagram website"
        iconButton={true}
        ripple={true}
        buttonStyle="text"
        onClick={() => {}}
      >
        <MdPlayCircle size={50} />
        <DctRipple />
      </DctButton>

      <DctButton
        ariaLabel="Open link to the Fantarka page on the Instagram website"
        iconButton={true}
        ripple={true}
        buttonStyle="text"
        onClick={() => {}}
      >
        <MdSkipNext size={50} />
        <DctRipple />
      </DctButton>
    </section>
  );
};
