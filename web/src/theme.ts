import { createTheme } from '@mui/material/styles';
import { colors } from '@cross-platform-ts-starter/core';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
});

export default theme;
