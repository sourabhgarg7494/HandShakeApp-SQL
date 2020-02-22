import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import registerServiceWorker from './registerServiceWorker';
import store from './js/store/index';
import { Provider } from 'react-redux';

//render App component on the root element
ReactDOM.render(
     <Provider store ={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);

serviceWorker.unregister();
//registerServiceWorker();
