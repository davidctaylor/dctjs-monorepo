export interface Track {
  title: string;
  artwork_url: string | null;
  stream_url: string;
  description: string;
}

export const LOCAL_TRACKS: Track[] = [
  {
    title: 'Get Funky',
    artwork_url: '/assets/images/get-funky-final.webp',
    //stream_url: './wave/get-funky-2023.wav',
    stream_url: '/assets/audio/wood.wav',
    description: 'Ambient track',
  },
  {
    title: 'Above the clouds',
    artwork_url: '/assets/images/above-the-clouds.webp',
    // stream_url: './wave/above-the-clouds-2023.wav',
    stream_url: '/assets/audio/wood.wav',
    description: 'Ambient track',
  },
  {
    title: 'Give you love',
    artwork_url: '/assets/images/give-you-love.webp',
    stream_url: '/assets/wave/give-you-love-2023.wav',
    description: 'Ambient track',
  },
  {
    title: 'Herm',
    artwork_url: '/assets/images/fantarka.webp',
    stream_url: '/assets/wave/herm.ma4',
    description: 'Ambient track',
  },
  {
    title: 'So good',
    artwork_url: '/assets/images/so-good.webp',
    stream_url: '/assets/wave/so-good.wav',
    description: 'Ambient track',
  },
  {
    title: 'Solarium',
    artwork_url: '/assets/images/solar.webp',
    stream_url: '/assets/wave/solarium.ma4',
    description: 'Uplifting Old School style dance track with a modern twist!',
  },
];