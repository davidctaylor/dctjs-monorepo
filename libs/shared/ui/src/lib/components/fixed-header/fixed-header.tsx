import { useEffect, useRef, useState } from 'react';
import { useScrollPosition } from '../../effects';

/* eslint-disable-next-line */
export interface FixedHeaderProps {
  navOptions?: { link: string; name: string }[];
  title: string;
}

export function FixedHeader(props: FixedHeaderProps) {
  const [headerStyle, setHeaderStyle] = useState<Record<string, string>>({
    position: 'relative',
  });
  const componentRef = useRef<HTMLElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (
      headerStyle.position !== 'fixed' &&
      navbarRef.current?.getBoundingClientRect().height &&
      scrollPosition.y > navbarRef.current?.getBoundingClientRect().height
    ) {
      setHeaderStyle({
        position: 'fixed',
        backgroundColor: `rgba(0, 0, 0, 1)`,
        boxShadow: 'black 0px 0px 30px 32px',
        width: `${navbarRef.current?.getBoundingClientRect().width}px`,
        maxWidth: '' + navbarRef.current?.getBoundingClientRect().width,
      });
    } else if (
      headerStyle.position === 'fixed' &&
      navbarRef.current?.getBoundingClientRect().height &&
      scrollPosition.y < navbarRef.current?.getBoundingClientRect().height
    ) {
      setHeaderStyle({
        position: 'relative',
        backgroundColor: `rgba(0, 0, 0, 0)`,
      });
    }
  }, [headerStyle, scrollPosition]);

  return (
    <header className="flex flex-col relative z-10 w-full" ref={componentRef}>
      <nav ref={navbarRef}>
        <ul className="flex gap-x-4 pt-8 px-8 text-white">
          {props.navOptions &&
            props.navOptions.map((o) => (
              <li key={o.link}>
                <a href={o.link}>{o.name} </a>
              </li>
            ))}
        </ul>
      </nav>
      <h1
        className="text-4xl pt-4 pb-0 tracking-wide text-white w-full text-center"
        style={headerStyle}
      >
        {props.title}
      </h1>
    </header>
  );
}

export default FixedHeader;
