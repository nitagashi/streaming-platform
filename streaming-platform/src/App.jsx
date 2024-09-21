import Footer from 'components/Footer';
import Header from 'components/Header';
import AppRoutes from 'router/AppRoutes';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
} from '@apollo/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import 'style/style.scss'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
  cache: new InMemoryCache(),
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e1e2b',
      dark: '#111114',
      light: '#39394e',
      contrastText: '#f5f5f7',
    },
    secondary: {
      main: '#f5f5f7',
      dark: '#1e1e2b',
      light: '#f5f5f7',
      contrastText: '#f5f5f7',
    },
    error: {
      main: '#ff1a1a',
    },
    background: {
      default: '#1d1d1f',
      paper: '#2a2a35',
    },
    text: {
      primary: '#f5f5f7',
      secondary: '#afafaf',
    },
    grey: {
      500: '#171717', 
      800: '#0f0f0f',
    },
    action: {
      hover: '#1e1e2b50',
      focus: '#f5f5f7',
      selected: '#8b00006e',
    },
  },
  components:{
  MuiTextField: {
    styleOverrides: {
      root: {
        '--TextField-brandBorderColor': '#E0E3E7',
        '--TextField-brandBorderHoverColor': '#B2BAC2',
        '--TextField-brandBorderFocusedColor': '#6F7E8C',
        '& label.Mui-focused': {
          color: 'var(--TextField-brandBorderFocusedColor)',
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: {
        borderColor: 'var(--TextField-brandBorderColor)',
      },
      root: {
        color: 'var(--TextField-brandBorderColor)',
        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
          color: 'var(--TextField-brandBorderFocusedColor)',
          borderColor: 'var(--TextField-brandBorderHoverColor)',
        },
        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
          color: 'var(--TextField-brandBorderFocusedColor)',
          borderColor: 'var(--TextField-brandBorderFocusedColor)',
        },
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        '&::before, &::after': {
          borderBottom: '2px solid var(--TextField-brandBorderColor)',
        },
        '&:hover:not(.Mui-disabled, .Mui-error):before': {
          borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
        },
        '&.Mui-focused:after': {
          borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
        },
      },
    },
  },
  MuiInput: {
    styleOverrides: {
      root: {
        '&::before': {
          borderBottom: '2px solid var(--TextField-brandBorderColor)',
        },
        '&:hover:not(.Mui-disabled, .Mui-error):before': {
          borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
        },
        '&.Mui-focused:after': {
          borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
        },
      },
    },
  },
}
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
      <div className="App">
        <Header />
          <AppRoutes />
        <Footer />
      </div>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
