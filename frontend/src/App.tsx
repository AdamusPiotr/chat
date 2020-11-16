import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalStyles } from './App.styled';
import { Chat } from './container/Chat/Chat';
import { LandingPage } from './container/LandingPage/LandingPage';


function App() {  

  return (
  <>
 
    <GlobalStyles/>
    <Router>
      <Switch>
        <Route path="/:username/:room" component={Chat}/>
        <Route path="/" component={LandingPage}/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
