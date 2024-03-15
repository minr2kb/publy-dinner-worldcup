import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { FontWeightValues } from './fontTypes';

const theme = createTheme({
  palette: {
    primary: {
      main: '#334155',
    },
    secondary: {
      main: '#333',
      contrastText: '#fff',
    },
    error: {
      main: red[400],
    },
    text: {
      primary: '#334155',
      secondary: '#64748B',
      disabled: '#94A3B8',
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: FontWeightValues.REGULAR,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          sx: {},
        },
      },
      defaultProps: {
        inputProps: {
          sx: {
            bgcolor: '#fff',
            borderRadius: 1,
            fontSize: 14,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          textTransform: 'none',
          fontSize: 14,
          fontWeight: FontWeightValues.SEMI_BOLD,
          height: 53,
          minWidth: 0,
          ':hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        inputProps: { sx: { py: 1.2, fontSize: 14 } },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: FontWeightValues.REGULAR,
        },
      },
    },
  },
  typography: {
    fontFamily: 'Apple SD Gothic Neo, sans-serif',
  },
});

export default theme;
