import React from 'react';
import Banner from './../Banner';

import Post from '../Post/post';
import axios from 'axios';
import { Image } from 'react-bootstrap';


class  Welcome extends React.Component{
  constructor(props){
    super(props)
    this.state={
      post:[],
      user : [],
      categories : [],
    }
  }

  componentDidMount(){
    axios.get("/api/post",{
      headers : {
        Authorization: "Bearer" + localStorage.getItem("userToken")
    },
    }).then(res =>{
      this.setState({
        post: res.data.post,
        user : res.data.user,
        categories: res.data.categories
      })
    }).catch(errors =>{
      console.log(errors)
    })

    
  }

  render(){
      const RenderPost = this.state.post !== [] ? 
      this.state.post.map(res => {
        return (
            <>
            <Post post={res}/>
            </>
        ) 
      })
      : 
      null
      const category = this.state.categories ? this.state.categories.map(res => {
        return <div className="tag" style={{backgroundColor: 'rgb(218, 213, 213)'}}> <a href={'/tags/'+res.id} style={{color: 'rgb(74, 96, 138)'}}>{res.name + "  " + res.posts_count}</a></div>
          }) : <></>
    return (
    <div>
      <Banner 
      backgroundImage="url(assets/img/bg-gift.jpg)"
      title="Latest Blog Posts"
      subtitle="Read and get updated on the latest posts"
      />
      <main className="main-content bg-gray">    
      <div className="container">
          <div className="row">
              <div className="col-12 col-xl-8">
                {RenderPost}
              </div>
              <div className="col-12 col-xl-4">
              <div className="text-center">
              <div className="container" style={{borderLeft: "1px solid black"}}>
                <hr className='w-10'></hr>
                <div className="row">
                  <div className="col-12 col-xl-4">
                    <Image src={this.state.user.avatar} className="img-circle avatar" style={{width: "75px" , height:"75px"}}></Image>
                      </div>
                      <div className="col-12 col-xl-8">
                        <h4><a href={"/user/profile"}> {this.state.user.name} </a></h4>
                        <p>tham gia từ : <date>{new Date(Date.parse(this.state.user.created_at)).toLocaleDateString()}</date></p>
                        <p>số lượng blog : {this.state.user.post_count}</p>
                        <p>số lượng follow: {this.state.user.follower_count}</p>
                      </div>
                    </div>
                    <hr></hr>
                      <div className='container'>
                        <h4>Chủ đề nổi bật: </h4>
                          {category}
                          <p></p>
                        <a href='/tags'>
                          <h5 style={{color: 'white', backgroundColor: 'green'}}>Xem tất cả chủ đề</h5>
                        </a>
                      </div>
                      <hr></hr>
                  </div>
                </div>
                
              </div>
            </div>
        </div>  
      </main>
    </div>
    )
};
}

export default Welcome;