import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/HomePage';
import SocketContext from './context/SocketContext';
import { BandNamesApp } from './BandNamesApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BandNamesApp />
);
