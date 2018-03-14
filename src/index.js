import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

fontawesome.library.add(solid)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
