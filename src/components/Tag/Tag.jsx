import React from 'react';
import Banner from './../Banner';

import Post from '../Post/post';
import axios from 'axios';
import { Image } from 'react-bootstrap';

class  Tags extends React.Component{
  constructor(props){
    super(props)
    this.state={
      categories: [],
    }
  }

  componentDidMount(){
    axios.get("/api/categories",{
        headers : {
            Authorization: "Bearer" + localStorage.getItem("userToken")
        },
    }).then(res =>{
        this.setState({
            categories : res.data.categories
        })
        console.log(this.state.categories)
    }).catch(errors =>{
      alert(errors.response.data.errors)
    })
  }

  onClickFollow=(event)=>{
    event.preventDefault()
    axios({
      url:'/api/follow/category',
      method: 'POST',
      headers : {
        Authorization: "Bearer" + localStorage.getItem("userToken")
      },
      data : {
        "id" : event.target.name,
      }
    }).then(res=>{
      let data = this.state.categories.map(category =>{
        if(category.id == res.data.id){
          category.is_follow = true
        }
        return category
      })
      this.setState({
        categories : data
      })
    }).catch(err => {
      console.log(err)
    })

  }

  onClickDeleteFollow = event => {
    event.preventDefault()
    axios({
      url:'/api/follow/category',
      method: 'DELETE',
      headers : {
        Authorization: "Bearer" + localStorage.getItem("userToken")
      },
      data : {
        "id" : event.target.name,
      }
    }).then(res=>{
      let data = this.state.categories.map(category =>{
        if(category.id == res.data.id){
          category.is_follow = false
        }
        return category
      })
      this.setState({
        categories : data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render(){
      const RenderPost = this.state.categories !== [] ? 
      this.state.categories.map(res => {
        return (
            <>
            
            <div className="col-12 col-xl-3" >
                <h5>
                    <a href={'/tags/'+res.id} style={{color: 'blueviolet'}}>
                    {res.name}
                </a>
                </h5>
            </div>
            <div className="col-12 col-xl-6">
                {res.posts_count == 0 ? <p>Chưa có bài viết nào</p>
                :
                <>
                <h6>
                    <Image src={res.posts[0].user.avatar} className="img-circle avatar" style={{width: "35px" , height:"35px"}}></Image>
                    <a href={'/post/'+res.posts[0].id}>  {res.posts[0].title}</a>
                </h6>
                { res.posts[1] ? 
                <h6>
                    <Image src={res.posts[1].user.avatar} className="img-circle avatar" style={{width: "35px" , height:"35px"}}></Image>
                    <a href={'/post/'+res.posts[1].id}>  {res.posts[1].title}</a>
                </h6> : null
                }
                { res.posts[2] ? 
                <h6>
                    <Image src={res.posts[2].user.avatar} className="img-circle avatar" style={{width: "35px" , height:"35px"}}></Image>
                    <a href={'/post/'+res.posts[2].id}>  {res.posts[2].title}</a>
                </h6> : null
                }
                </> 
                }
            </div>
            <div className="col-12 col-xl-3" >
                <div className="text-center">
                    {
                      res.is_follow == true ? 
                      <button type='button' className="btn btn-primary" onClick={this.onClickDeleteFollow} name={res.id}>
                        Huy Follow
                      </button>
                      :
                      <button type='button' className="btn btn-primary" onClick={this.onClickFollow} name={res.id}>
                        Follow
                    </button>
                    }
                    
                </div>
            </div>
            <div className="container" >
                <hr></hr>
            </div>
            </>
        ) 
      })
      : 
      null
    return (
    <div>
      <Banner 
      backgroundImage="url(assets/img/bg-gift.jpg)"
      title="Tất cả chủ đề"
      subtitle="Follow Tags Để nhận thông báo về bài viết mới nhất"
      />
    <main className="main-content" style={{paddingTop: '5px'}}>
        
      <div className="container">
      {/* <h5>Follow Tags Để nhận thông báo về bài viết mới nhất</h5> */}
      <br/>
        <div className="row">
            <hr></hr>
          {RenderPost}
        </div>

    </div>
    {/*
|‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
| Comments
|‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
!*/}
    
  </main>
    </div>
    )
};
}

export default Tags;