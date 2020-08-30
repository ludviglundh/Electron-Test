export const COLORS = {
  white: '#ffffff',
  black: '#191414',
  nero: '#222222',
  spotify: '#1DB954',
}

export const LIGHT_THEME = {
  background: {
    primary: COLORS.white,
    secondary: COLORS.spotify,
  },
  text: {
    primary: COLORS.spotify,
    secondary: COLORS.black,
  },
  picker: {
    selected: COLORS.spotify,
    unSelected: COLORS.white,
  },
}

export const DARK_THEME = {
  background: {
    primary: COLORS.nero,
    secondary: COLORS.spotify,
  },
  text: {
    primary: COLORS.spotify,
    secondary: COLORS.white,
  },
  picker: {
    selected: COLORS.spotify,
    unSelected: COLORS.white,
  },
}
