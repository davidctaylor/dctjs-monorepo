import React from 'react';
import { DctButton } from '@dctjs/react';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share';

import { InstagramSVG, SoundCloudSVG } from '@dctjs-monorepo/shared-ui';

const ICON_SIZE = 32;
const SHARE_URL = 'http://www.fantarka.com/';

/* eslint-disable-next-line */
interface SectionAboutProps {}

export const SectionAbout: React.FC<SectionAboutProps> = () => {

  return (
    <section id="about">
      <h2 className="text-center text-white text-2xl pt-4 pb-8">About</h2>
      <div className="flex flex-col justify-start align-center px-4 md:px-16 gap-y-8">
        <p className="text-white md:w-2/3 self-center font-light">
          Fantarka is a dance music producer encompassing house, trance feel and
          ambient tracks. We've recently released 'So Good' and have other
          tracks coming out this Spring. Check out your streaming platform for
          latest releases.
        </p>
        <div className="text-white md:w-2/3 self-center">
          <a
            href="mailto:info@fantarka.com?subject=Fantarka Music"
            className="w-full flex flex-row"
          >
            <p>Contact us at <span className="font-bold">info@fantarka.com </span></p>
          </a>
          <p>or follow our socials</p>
        </div>

        <div className="flex justify-center gap-8 items-center">

        <FacebookShareButton
          className="[&>*:hover]:border-white [&>*:hover]:border [&>*:hover]:border-4 [&>*]:rounded-full"
          url={SHARE_URL}
          children={<FacebookIcon size={ICON_SIZE} round={true} />}
        />
        <TwitterShareButton
          className="[&>*:hover]:border-white [&>*:hover]:border [&>*:hover]:border-4 [&>*]:rounded-full"
          url={SHARE_URL}
          children={<TwitterIcon size={ICON_SIZE} round={true} />}
        />
        <DctButton
          ariaLabel="Open link to the Fantarka page on the Instagram website"
          iconButton={true}
          buttonStyle="text"
          onClick={() => window.open('https://instagram.com/fantarka', '_blank')}
        >
          <InstagramSVG className="bg-white scale-75 border-4 border-white rounded-full"/>
        </DctButton>

        <DctButton
          ariaLabel="Open link to the Fantarka page on the SoundCloud website"
          iconButton={true}
          buttonStyle="text"
          onClick={() => window.open('https://soundcloud.com/fantarka', '_blank')}
        >
          <SoundCloudSVG />
        </DctButton>
      </div>

      </div>
    </section>
  );
};
