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
} from './components/index';
import store from './store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <div className={styles.layer}>
        <div className={styles.container}>
          <SwitchLanguage />
          <GlobalData />
          <CountryData />
          <Chart />
          <GetUsStates />
          <UsStateChart />
          <Footer />
        </div>
      </div>
    </Provider>
  );
};

export default App;
