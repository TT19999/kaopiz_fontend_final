import React from 'react'
import axios from "axios"
import Banner from '../Banner'
import { Link } from 'react-router-dom'
import FormReset from './form_reset'
import ModalEdit from './modal_edit'

class Profile extends React.Component {
    constructor()
    {
        super()
        this.state={
            first_name:"",
            lats_name:"",
            email:"",
            avatar:"",
            phone:"",
            avatar: "",
            user: [],
            profile:[],
            action:"",
            skill:[],
            showModalCard : false,
            post_count: '',
            follower_count:'',
        }
    }
    async componentDidMount()  {
        await axios.get("/api/user/profile",{
            headers: {'Authorization' : 'Bearer ' + localStorage.getItem("userToken")}
        }).then(res => {
            console.log(res)
            if(res.status === 200){
                this.setState({
                    user:res.data.user,
                    profile: res.data.profile,
                    skill : res.data.skill,
                    action: res.data.action,
                    avatar : res.data.profile.avatar,
                    post_count : res.data.post_count,
                    follower_count : res.data.follower_count
                })
                console.log(this.state.user.name)
            }
        }).catch(errors => {
            console.log(errors.response);
            alert(errors.response.data.errors)
            if(errors.response.status === 401) {
                localStorage.removeItem("userToken")
                localStorage.removeItem("userName")
                window.location.replace('/login')
            }
          })
    }

    onClickEdit(){
        this.setState({
            showModalCard: !this.state.showModalCard
        })
    }

    onAvatarChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            var data = new FormData()
            data.append("avatar", img)
            axios.post('/api/user/profile/avatar',data, {
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem("userToken")
                }
            }).then(res => {
                console.log(res)
                this.setState({
                    avatar : res.data.avatar
                })
                alert(res.data.message)
            }).catch(errors => {
                console.log(errors.response);
                alert(errors.response.data.errors)
            })
          }
        
    }

    render(){
        const Skill = this.state.skill !== [] ? 
                this.state.skill.map(res => {
                   return (
                       <>
                       <a className="badge badge-pill badge-default" href={"/post/"+res.name}>{res.name}</a> <br/>
                       </>
                   ) 
                })
                : 
                null
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
                                        <img src={this.state.avatar} alt="" />
                                        <div class="file btn btn-lg btn-primary">
                                            Change Photo
                                            <input type="file" name="avatar" onChange={this.onAvatarChange} />
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
                                </div>
                                <div class="col-md-6">
                                    <div class="profile-head">
                                        <h5>
                                            {this.state.user.name}
                                        </h5>
                                        <h6>
                                            {this.state.profile.subject}
                                        </h6>
                                        <p> Số lượng blog : {this.state.post_count}</p>
                                        <p> Số lượng blog : {this.state.follower_count}</p>
                                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                            </li>
                                            <li class="nav-item" style={{paddingLeft: "5px"}}>
                                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Password</a>
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
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Status</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <p>{this.state.profile.status}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <FormReset />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-2">
                                    <ModalEdit user={this.state.user} profile={this.state.profile} skill={this.state.skill}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}

export default Profile