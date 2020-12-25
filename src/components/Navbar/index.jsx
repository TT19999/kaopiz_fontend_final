import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(){
    super()
    this.onClick=this.onClick.bind(this)
  }

  onClick(e){
    localStorage.removeItem('userToken')
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    window.location.reload("/")
  }

  render(){
  return (
  <nav className="topbar topbar-inverse topbar-expand-md topbar-sticky">
        <div className="container">
          <div className="topbar-left">
            <button className="topbar-toggler">☰</button>
            <Link className="topbar-brand" to="/">
              <img className="logo-default" src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt="logo" />
              <img className="logo-inverse" src={`${process.env.PUBLIC_URL}/assets/img/logo-light.png`} alt="logo" />
            </Link>
          </div>
          <div className="topbar-right">
            <ul className="topbar-nav nav">
              
              
              {localStorage.getItem("userToken") != null ? 
              <>
              <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/post/create">Create</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">{localStorage.getItem("userName")}
                  <i className="fa fa-caret-down" />
                </a>
                <div className="nav-submenu">
                  <a className="nav-link" href="/user/profile">My Profile</a>
                  <a className="nav-link" href="/user/post">My Blog</a>
                  <a className="nav-link" onClick={this.onClick} href="/">Logout</a>
                </div>
              </li>
              </>
              : 
              <>
                <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signup">Signup</a>
              </li>
              </>
              
              }
              
            </ul>
          </div>
        </div>
      </nav>
  );
  }
}

export default Navbar;