import React from "react";
import { connect } from "react-redux";
import Counter from "../components/Counter";
import { increaseAsync, decreaseAsync } from "../modules/counter";

const CounterContainer = ({ number, increaseAsync, decreaseAsync }) => {
  return (
    <Counter
      onIncrease={increaseAsync}
      onDecrease={decreaseAsync}
      number={number}
    />
  );
};

export default connect(
  (state) => ({
    number: state.counter,
  }),
  {
    increaseAsync,
    decreaseAsync,
  }
)(CounterContainer);
