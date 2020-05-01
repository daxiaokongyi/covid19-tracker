import React from 'react';
import styles from './App.module.css';
import { GlobalData, CountryData, Chart, Footer } from './components/index';
import store from './store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <div className={styles.layer}>
        <div className={styles.container}>
          <GlobalData />
          <CountryData />
          <Chart />
          <Footer />
        </div>
      </div>
    </Provider>
  );
};

export default App;
