/** @jsx jsx */
import { jsx } from '@emotion/core'
import {
  ThemeProvider as MaterialThemeProvider,
  createMuiTheme,
} from '@material-ui/core'

import { blueGrey, grey } from '@material-ui/core/colors'

export const ThemeProvider: React.FC = ({ children }) => {
  const theme = createMuiTheme({
    palette: { type: 'dark', primary: blueGrey, secondary: grey },
  })
  return (
    <MaterialThemeProvider theme={theme}> {children}</MaterialThemeProvider>
  )
}
