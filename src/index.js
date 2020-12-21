import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/SignUp/index';
import SingleArticle from './components/SingleArticle';
import CreateArtice from './components/CreateArticle';
import * as serviceWorker from './serviceWorker';
import Profile from './components/Profile/profile';
import "./index.css";


const Main = withRouter(({ location }) => {
return (
<div>
  {
    location.pathname !== '/login' && location.pathname !== '/signup' &&
    <Navbar/>
  }
    <Switch>
      <Route exact path="/" component={Welcome}/>   
      <Route  exact path="/user/profile" component={Profile}/>
      <Route exact path="/article/:slug" component={SingleArticle}/>
      <Route exact path="/articles/create" component={CreateArtice}/>
      <Route exact path="/signup" component={SignUp}/>

      <Route exact path="/login" >
        {localStorage.getItem("userToken") ? 
        <>
        <Redirect to="/"/>
        </>
        : <Login></Login>}
      </Route>
    </Switch>
    
    
    {
    location.pathname !== '/login' && location.pathname !== '/signup' &&
    <Footer />
    }
  </div>
);
});

ReactDOM.render(
  <BrowserRouter>
  <Main />
  </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
//https://designrevision.com/downloads/shards-dashboard-lite-react/
