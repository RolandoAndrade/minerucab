// LIBRERIAS EXTERNAS
import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from './routers/AppRouter';
import 'normalize.css/normalize.css'; // LIMPIA LOS STYLES POR DEFECTO DEL NAVEGADOR
import 'bootstrap/scss/bootstrap.scss';
import './styles/styles.scss'; // SETEA LOS ESTILOS DE LA CARPETA styles/

// SE INICIA LA APP
ReactDOM.render( <AppRouter /> , document.getElementById('app'));