import React, { useRef, useEffect, useState } from 'react';
import { PageMain } from '@dctjs-monorepo/fantarka-ui';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-transparant w-screen h-screen">
      <PageMain/>
    </div>
  );
};

export default App;
