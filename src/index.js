import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './style/style.scss';
// import MarvelService from "./services/MarvelService";
//
// const marvelService = new MarvelService();
//
// marvelService.getAllCaracters().then(res => res.data.results.forEach(item => console.log(item.name)));
// marvelService.getCaracter(1011027).then(res => console.log(res));

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(<React.StrictMode><App/></React.StrictMode>);

