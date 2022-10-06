import './assets/css/global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/home/home';
import Join from './components/join/join';
import Congrat from './components/congrat/congrat';

import store from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />}></Route>
                <Route path="/join/" element={<Join />}></Route>
                <Route path="/congratulation/" element={<Congrat />}></Route>

            </Routes>  
        </BrowserRouter>
    </Provider>
);