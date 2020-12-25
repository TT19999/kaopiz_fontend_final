import React from 'react';
import { Link } from 'react-router-dom';

class Post extends React.Component {
    constructor(props){
        super(props)
    }


    render(){
      const category = this.props.post.categories ? this.props.post.categories.map(res => {
        return <div class="tag">{res.name}</div>
          }) : <></>
        return (
          <div class="blog-card-grid-space">
          <a class="blogg-card" href={"/post/" + this.props.post.id}>
            <div>
              <h1>{this.props.post.title}</h1>
              <p>{this.props.post.intro}</p>
              <p>By {this.props.post.author}</p>
              <div class="date">{new Date(Date.parse(this.props.post.created_at)).toLocaleDateString()}</div>
              <div class="tags">
                {category} 
              </div>
            </div>
          </a>
        </div>
  );
    }
}
  

export default Post;