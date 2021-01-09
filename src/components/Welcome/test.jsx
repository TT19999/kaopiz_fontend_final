import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Banner from "../Banner";

export default class MyComponent  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      editorHtml : ""
    }
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'align': []}],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'align',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  handleChange = html => {
    this.setState({editorHtml : html})
    console.log(this.state.editorHtml)
    
  }

  buttonClick = (event) =>{
    this.setState({
      editorHtml: this.state.editorHtml + "<p>AAAA</p>"
    })
    console.log(this.state.editorHtml)
  } 


  delta = {
    ops: [{
      insert: 'Hello'
    }, {
      insert: 'World',
      attributes: { bold: true }
    }, {
      insert: {
      image: 'https://kaopiz-final.s3-ap-southeast-1.amazonaws.com/post/1608732438_eEfXqPwoys'
      },
      attributes: { width: 'auto', textAlign : 'center' }
    }]
  };
  render() {
    return (
      <>
      {/* <Banner 
      backgroundImage="url(assets/img/bg-gift.jpg)"
      title="Latest Blog Posts"
      subtitle="Read and get updated on the latest posts"
      /> */}
      {/* <div>

      <li className="dropdown"> 
      <a id="dLabel" role="button" data-toggle="dropdown" data-target="#" href="/page.html">
        <i className="fa fa-bell"></i>
      </a>
      
      <ul className="dropdown-menu notifications" role="menu" aria-labelledby="dLabel">
        
        <div className="notification-heading"><h4 className="menu-title">Notifications</h4><h4 className="menu-title pull-right">View all<i className="glyphicon glyphicon-circle-arrow-right"></i></h4>
        </div> 
      <div className="notifications-wrapper"> 
        <a className="content" href="#"> 
          <div className="notification-item">
          <img src="http://www.leapcms.com/images/100pixels1.gif"/>
            <h4 className="item-title">Evaluation Deadline  <small> 1 day ago</small></h4>
            <p className="item-info">Mr hassan has followed you!</p>
          </div>  
        </a>

        <a className="content" href="#">
          <div className="notification-item">
          <img src="http://www.leapcms.com/images/100pixels1.gif"/>
            <h4 className="item-title">Evaluation Deadline  <small> 1 day ago</small></h4>
            <p className="item-info">Marketing 101, Video Assignment</p>
          </div>
        </a> 
        <a className="content" href="#"> 
          <div className="notification-item">
          <img src="http://www.leapcms.com/images/100pixels1.gif"/>
            <h4 className="item-title">Evaluation Deadline  <small> 1 day ago</small></h4>
            <p className="item-info">Mr hassan has followed you!</p>
          </div>  
        </a> 
        <a className="content" href="#"> 
          <div className="notification-item">
          <img src="http://www.leapcms.com/images/100pixels1.gif"/>
            <h4 className="item-title">Evaluation Deadline  <small> 1 day ago</small></h4>
            <p className="item-info">Mr hassan has followed you!</p>
          </div>  
        </a> 
        <a class="content" href="#"> 
          <div class="notification-item">
          <img src="http://www.leapcms.com/images/100pixels1.gif"/>
            <h4 class="item-title">Evaluation Deadline  <small> 1 day ago</small></h4>
            <p class="item-info">Mr hassan has followed you!</p>
          </div>  
        </a>
      </div> 
      </ul>
      </li>
              
      </div> */}



        <nav class="navbar fixed-top navbar-light bg-faded">

        <div class="dropdown nav-button notifications-button hidden-sm-down">

          <a class="btn btn-secondary dropdown-toggle" href="#" id="notifications-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i id="notificationsIcon" class="fa fa-bell-o" aria-hidden="true"></i>
            <span id="notificationsBadge" class="badge badge-danger">1</span>
          </a>

          <div class="dropdown-menu notification-dropdown-menu" aria-labelledby="notifications-dropdown">
            <h6 class="dropdown-header">Notifications</h6>
            <div id="notificationsContainer" class="notifications-container"></div>

            {/* <!-- AUCUNE NOTIFICATION --> */}
            <a class="dropdown-item dropdown-notification" href="{{href}}">
              <div class="notification-read">
                <i class="fa fa-times" aria-hidden="true"></i>
              </div>
              <img class="notification-img" src="https://placehold.it/48x48" alt="Icone Notification" />
              <div class="notifications-body">
                <p class="notification-texte">a</p>
                <p class="notification-date text-muted">
                  <i class="fa fa-clock-o" aria-hidden="true"></i> b
                </p>
              </div>
            </a>

            <a class="dropdown-item dropdown-notification" href="{{href}}">
              <div class="notification-read">
                <i class="fa fa-times" aria-hidden="true"></i>
              </div>
              <img class="notification-img" src="https://placehold.it/48x48" alt="Icone Notification" />
              <div class="notifications-body">
                <p class="notification-texte">a</p>
                <p class="notification-date text-muted">
                  <i class="fa fa-clock-o" aria-hidden="true"></i> b
                </p>
              </div>
            </a>

            <a class="dropdown-item dropdown-notification" href="{{href}}">
              <div class="notification-read">
                <i class="fa fa-times" aria-hidden="true"></i>
              </div>
              <img class="notification-img" src="https://placehold.it/48x48" alt="Icone Notification" />
              <div class="notifications-body">
                <p class="notification-texte">a</p>
                <p class="notification-date text-muted">
                  <i class="fa fa-clock-o" aria-hidden="true"></i> b
                </p>
              </div>
            </a>

            <a class="dropdown-item dropdown-notification" href="{{href}}">
              <div class="notification-read">
                <i class="fa fa-times" aria-hidden="true"></i>
              </div>
              <img class="notification-img" src="https://placehold.it/48x48" alt="Icone Notification" />
              <div class="notifications-body">
                <p class="notification-texte">a</p>
                <p class="notification-date text-muted">
                  <i class="fa fa-clock-o" aria-hidden="true"></i> b
                </p>
              </div>
            </a>

            {/* <!-- TOUTES --> */}
            <a class="dropdown-item dropdown-notification-all" href="#">
              Đánh dấu tất cả là đã đọc
            </a>

          </div>

        </div>

        </nav>
      </>
    );
  }
  
}




