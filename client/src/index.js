import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import Reducer from './_reducers';

// 원래는 createStore로 Store만 받으면 되는데,
// 그렇게 되면 promise와 fundtions으로 들어오는 action은 받을 수 없기 때문에 
// redux-promise, redux-thunk를 함께 작성 해준다.
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, reduxThunk)(createStore);

ReactDOM.render(
  <Provider store = { createStoreWithMiddleware(Reducer, 
    // redux extention(chrome qpp Redux DevTools)를 연결한다.
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
  ) }>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
