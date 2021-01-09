    import React from 'react'
  import axios from "axios"
  import Banner from '../Banner'
  import { Link } from 'react-router-dom'
  import FormReset from './form_reset'
import ModalEdit from './modal_edit'
import Post from '../Post/post'
  
  class Form extends React.Component {
      constructor(props)
      {
          super(props)
          this.state={
              first_name:"",
              lats_name:"",
              email:"",
              avatar:"",
              phone:"",
              user: [],
              profile:[],
              action:"",
              skill:[],
              is_follow: false,
              userPost : [],
          }
      }
  
      async componentDidMount()  {
          axios({
                method:'GET',
                url: '/api/user/profile/show',
                headers : {
                    Authorization: "Bearer" + localStorage.getItem("userToken")
                },
                params: {
                    user_id : this.props.match.params.id
                },
          }).then(res => {
              console.log(res.data)
              if(res.status === 200){
                  this.setState({
                      user:res.data.user,
                      profile: res.data.profile,
                      skill : res.data.skill,
                      action: res.data.action,
                      is_follow : res.data.is_follower
                  })
                  var userPost = res.data.user.post
                  this.setState({
                    userPost : userPost
                  })
                  console.log(this.state.user.name)
              }
          }).catch(errors => {
            console.log(errors.response);
            alert(errors.response.data.errors)
          })
      }

      onClickFollow=(event)=>{
        event.preventDefault()
        var method_=''
        this.state.is_follow == true ? method_="DELETE" : method_="POST" 
        axios({
          url:'/api/follow',
          method: method_,
          headers : {
            Authorization: "Bearer" + localStorage.getItem("userToken")
          },
          data : {
            "id" : this.state.profile.user_id,
          }
        }).then(res=>{
          this.setState({
            is_follow: ! this.state.is_follow
          })
          console.log(res)
        }).catch(err => {
          console.log(err.response)
          
        })
      }

      render(){
          const Skill = this.state.skill != null ? 
                  this.state.skill.map(res => {
                     return (
                         <>
                         <a className="badge badge-pill badge-default" href={"/article/"+res.name}>{res.name}</a> <br/>
                         </>
                     ) 
                  })
                  : 
                  null

                  const userPost = this.state.userPost !== [] ? this.state.userPost.map(post =>{
                    return <Post post={post} />
                }) : <></>
          return (
              <div>
                  <Banner 
                  backgroundImage="url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)"
                  />
                  <main className="main-content bg-gray">
                        <div class="container emp-profile">
                          <form method="post">
                              <div class="row">
                                  <div class="col-md-4">
                                      <div class="profile-img">
                                          <img src={this.state.profile.avatar} alt="" />
                                      </div>
                                      <div class="profile-work">
                                          <p>WORK LINK</p>
                                              <a href={this.state.profile.facebook}>facebook : <a>{this.state.profile.facebook}</a> </a><br/>
                                              <a href={this.state.profile.twitter}>twitter : <a>{this.state.profile.twitter}</a> </a><br/>
                                              <a href={this.state.profile.github}>github : <a>{this.state.profile.github}</a> </a><br/>
                                              <a href={this.state.profile.website}>website : <a>{this.state.profile.website}</a> </a><br/>
                                          <p>SKILLS</p>
                                          {Skill}
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="profile-head">
                                          <h5>
                                              {this.state.user.name}
                                          </h5>
                                          <h6>
                                              {this.state.profile.subject}
                                          </h6>
                                            <p> Số lượng blog : {this.state.user.post_count}</p>
                                            <p> Số lượng follower : {this.state.user.follower_count}</p>
                                          <ul class="nav nav-tabs" id="myTab" role="tablist">
                                              <li class="nav-item">
                                                  <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                              </li>
                                          </ul>
                                        
                                      </div>
                                      
                                      <div class="tab-content profile-tab" id="myTabContent">
                                          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                              <div class="row">
                                                  <div class="col-md-6">
                                                      <label>First Name</label>
                                                  </div>
                                                  <div class="col-md-6">
                                                      <p>{this.state.profile.first_name}</p>
                                                  </div>
                                              </div>
                                              <div class="row">
                                                  <div class="col-md-6">
                                                      <label>Last Name</label>
                                                  </div>
                                                  <div class="col-md-6">
                                                      <p>{this.state.profile.last_name}</p>
                                                  </div>
                                              </div>
                                              <div class="row">
                                                  <div class="col-md-6">
                                                      <label>Email</label>
                                                  </div>
                                                  <div class="col-md-6">
                                                      <p>{this.state.user.email}</p>
                                                  </div>
                                              </div>
                                              <div class="row">
                                                  <div class="col-md-6">
                                                      <label>Phone</label>
                                                  </div>
                                                  <div class="col-md-6">
                                                      <p>{this.state.profile.phone}</p>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                    <div class="col-md-2">
                                        {this.state.is_follow == false ? 
                                            <>
                                                <button type="button" className="btn btn-primary" onClick={this.onClickFollow} style={{float:'right'}}>
                                                Follow
                                                </button>
                                                
                                            </>
                                            :
                                            <>
                                            <button type="button" className="btn btn-primary" onClick={this.onClickFollow} style={{float:'right'}}>
                                                UnFollow
                                            </button>
                                            </>
                                            }
                                    </div>
                              </div>
                          </form>
                      </div>
                  </main>
                  <div className="bt-1 bg-grey" style={{paddingTop:"10px"}}>
                        <div className="container ">
                                {/* <div className="float-left image">
                                        <img src={localStorage.getItem("avatar")} className="img-circle avatar" alt=""/>
                                        <label for="comment">{localStorage.getItem("userName")}</label>
                                    </div> */}
                                <div className="card card-white post bg-grey ">
                                    <div className="post-heading">
                                        <div className="float-left meta">
                                            <div className="title h5">
                                                <p>Bài viết </p>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <p></p>
                                {userPost}
                                </div>
                        </div>
              </div>
          )
      }
  }
  
  export default Form