import { store } from '../store';
import React,{Component, Fragment} from 'react';
import api from '../services/api';
import {Provider} from 'react-redux';
import decode from 'jwt-decode';
import {BrowserRouter as Router} from 'react-router-dom';
import {setCurrentUser,addError,setToken} from '../store/actions';
import Auth from '../components/Auth';
import ErrorMessage from '../components/ErrorMessage';
import RouteViews from './RouteViews';
import Navbar from './NavBar';

if(localStorage.jwtToken){
    setToken(localStorage.jwtToken);
    try{
        console.log(decode(localStorage.jwtToken));
        store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
    }catch(err){
        store.dispatch(setCurrentUser({}));
        store.dispatch(addError(err));
    }
}


const App=()=>(
    <Provider store={store}>
        <Router>

    <Fragment>
       <Navbar/>
        <RouteViews/>
    </Fragment>
        
        </Router>
    </Provider>
    )
export default App;