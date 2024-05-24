global.Audio = jest.fn().mockImplementation(() => ({
  pause: () => {},
  play: () => {},
}))