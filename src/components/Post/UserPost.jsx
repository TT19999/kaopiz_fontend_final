import React from 'react';
import { Link } from 'react-router-dom';

class UserPost extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
    <article className="mt-90">
  <header className="text-center mb-40">
    <h3>
      <a href={"/post/" + this.props.post.id}>{this.props.post.title}</a>
    </h3>
    <div className="link-color-default fs-12">
      <a href="/post/news">News</a> , 
       <date>{new Date(Date.parse(this.props.post.created_at)).toLocaleDateString()}</date> By 
        <a href={'/user/profile/'+ this.props.user.id} > {this.props.post.author}</a>
    </div>
  </header>
  <a href="blog-single.html">
    {/* <img className="rounded" src={this.props.post.cover} alt="..." /> */}
  </a>
  <div className="card-block">
    <p className="text-justify">{this.props.post.intro}</p>
    <p className="text-center mt-40">
      <Link className="btn btn-primary btn-round" to={"/post/" + this.props.post.id}>Read more</Link>
    </p>
  </div>
</article>
    
  );
    }
}
  

export default UserPost;