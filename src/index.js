import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Api from './Components/Api';
import * as serviceWorker from './serviceWorker';


const conteiner =  document.getElementById('root');

ReactDOM.render(<Api/>, conteiner);

serviceWorker.unregister();

