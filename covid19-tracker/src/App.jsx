import React from 'react';
import styles from './App.module.css';
import {
  GlobalData,
  CountryData,
  Chart,
  Footer,
  SwitchLanguage,
  GetUsStates,
  UsStateChart,
  StateDailyNewCases,
  Navbar,
} from './components/index';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className={styles.layer}>
          <div className={styles.container}>
            <SwitchLanguage />
            <Navbar />
            <Switch>
              <Route exact path='/'>
                <GlobalData />
                <CountryData />
                <Chart />
              </Route>
              <Route exact path='/us'>
                <GetUsStates />
                <UsStateChart />
                <StateDailyNewCases />
              </Route>
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
