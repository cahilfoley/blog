import * as React from 'react'
import { Router, RouteComponentProps } from '@reach/router'
// import Button from '@material/react-button'

import PlaceholderPage from './pages/Placeholder'
import './App.scss'

const Placeholder: React.SFC<RouteComponentProps> = () => <PlaceholderPage />

// import logo from './logo.svg'

const App = () => {
  return (
    <Router>
      <Placeholder path="/" />
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <Button
    //       className="button-alternate"
    //       onClick={() => alert('Clicky click!')}
    //     >
    //       Learn React
    //     </Button>
    //   </header>
    // </div>
  )
}

export default App
