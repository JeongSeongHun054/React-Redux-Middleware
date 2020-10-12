# Redux Middleware를 통한 비동기 작업

## dependency

`yarn add redux react-redux redux-actions`


## 기본 Redux 구조 만들기

### counter Redux module 작성

`modules/counter.js`

```javascript
import { createAction, handleActions } from "redux-actions";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;

```

### rootReducer 생성

`modules/index.js`

```javascript
import { combineReducers } from "redux";
import counter from "./counter";

const rootReducer = combineReducers({
  counter,
});

export default rootReducer;
```

### Store 생성 후 Provider로 React 프로젝트에 Redux 적용

`index.js`

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import rootReducer from "./modules";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

### Counter Component 생성

`components/Counter.js`

```javascript
import React from "react";

const Counter = ({ onIncrease, onDecrease, number }) => {
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
};

export default Counter;
```

### Counter Container 생성

`Container는 스토어를 Component로 가져오기 위한 것`
`containers/CounterContainer`

```javascript
import React from "react";
import { connect } from "react-redux";
import { increase, decrease } from "../modules/counter";
import Counter from "../components/Counter";

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter onIncrease={increase} onDecrease={decrease} number={number} />
  );
};

export default connect(
  (state) => ({
    number: state.counter,
  }),
  {
    increase,
    decrease,
  }
)(CounterContainer);
```

### App.js에서 CounterContainer 렌더링

`App.js`

```javascript
import React from "react";
import CounterContainer from "./containers/CounterContainer";

function App() {
  return (
    <div>
      <CounterContainer />
    </div>
  );
}

export default App;

```
