import React, { useRef, useEffect, useState } from 'react';
import { PageMain } from '@dctjs-monorepo/fantarka-ui';
import { FixedHeader } from '@dctjs-monorepo/shared-ui';

const App: React.FC = () => {

  return (
    <div className="container mx-auto px-4 lg:px-2 flex flex-col items-center bg-transparent w-screen h-screen">
      <FixedHeader
        title="Fantarka"
        navOptions={[
          { link: '#about', name: 'About' },
          { link: '#music', name: 'Music' },
        ]}
      />
      <PageMain/>
    </div>
  );
};

export default App;
