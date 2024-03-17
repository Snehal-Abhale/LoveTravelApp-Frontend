import React from "react";
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import MainHome from './Components/MainHome';
import NewYork from './Components/NewYork';
import Rome from './Components/Rome';
import LasVegas from './Components/LasVegas';
import Login from './Components/Login';
import AppStore from './Components/AppStore';

const CityRoutes = () => (
    <BrowserRouter>
        <Switch> 
            <Route exact path="/" component={MainHome} />
            <Route exact path="/cities/new-york" component={NewYork} />
            <Route exact path="/cities/rome" component={Rome} />
            <Route exact path="/cities/las-vegas" component={LasVegas} />
        
            <Route exact path="/app" component={AppStore} />
        </Switch>
    </BrowserRouter>
);

export default CityRoutes;