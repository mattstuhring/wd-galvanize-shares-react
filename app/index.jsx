import { blue500, blue700 } from 'material-ui/styles/colors';
import Routes from 'components/Routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  flatButton: {
    buttonFilterColor: blue700,
    textColor: 'white'
  },

  palette: {
    primary1Color: blue500
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Routes />
  </MuiThemeProvider>,
  document.getElementById('app')
);
