import React from 'react';
import Banner from './../Banner';

import Post from '../Post/post';
import axios from 'axios';

class  Welcome extends React.Component{
  constructor(props){
    super(props)
    this.state={
      post:[],
    }
  }

  componentDidMount(){
    axios.get("/api/post").then(res =>{
      this.setState({
        post: res.data.post
      })
      console.log(res.data)
    }).catch(errors =>{
      alert(errors.response.data.errors)
    })
  }

  render(){
      const RenderPost = this.state.post != [] ? 
      this.state.post.map(res => {
        return (
            <>
            <Post post={res}/>
            </>
        ) 
      })
      : 
      null
    return (
    <div>
      <Banner 
      backgroundImage="url(assets/img/bg-gift.jpg)"
      title="Latest Blog Posts"
      subtitle="Read and get updated on the latest posts"
      />
    <main className="main-content bg-gray">      
          <section class="blog-cards-wrapper">
          {RenderPost}
          </section>
    </main>
    </div>
    )
};
}

export default Welcome;