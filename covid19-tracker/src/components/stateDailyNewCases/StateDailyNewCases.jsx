import React, { useEffect } from 'react';
import styles from './StateDailyNewCases.module.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getStates from '../../actions/getStates';
import stateTimeline from '../../actions/stateTimeline';

const StateDailyNewCases = ({
  states,
  chooseState: { state, allStates },
  stateTimeline,
}) => {
  useEffect(() => {
    const getStateTimeline = async () => {
      //   console.log(typeof state);
      stateTimeline(state);
    };
    getStateTimeline();
  }, [stateTimeline]);

  const onHandleChange = (e) => {
    getStates(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Daily New Cases By State</div>
      <select name='select-state' onChange={(e) => onHandleChange(e)}>
        {states.map(({ state }, i) => (
          <option value={state} key={i}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

StateDailyNewCases.propTypes = {
  states: PropTypes.array.isRequired,
  stateTimeline: PropTypes.func.isRequired,
  chooseState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  states: state.states,
  chooseState: state.chooseState,
});

export default connect(mapStateToProps, { stateTimeline })(StateDailyNewCases);
