import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class Post extends React.Component {
    constructor(props){
        super(props)
    }

    onClickDelete = (event) =>{
      event.preventDefault()
      axios({
        method: "DELETE",
        url: "/api/post/" + this.props.post.id,
        headers : {
            Authorization: "Bearer" + localStorage.getItem("userToken")
        },
      }).then(res => {
        console.log(res)
        window.location.replace('/')
    })
    }

    render(){
      const category = this.props.post.categories ? this.props.post.categories.map(res => {
        return <div className="tag"> <a href={'/tags/'+res.id}>{res.name + "  " + res.posts_count}</a></div>
          }) : <></>
        return (
          <div class="blog-card">
            <div class="meta">
              <div class="photo" style={{backgroundImage: 'url('+this.props.post.cover+')'}}></div>
              <ul class="details">
                <li class="author"><a href={'/user/profile/'+this.props.post.user_id}>{this.props.post.author}</a></li>
                <li class="date">{new Date(Date.parse(this.props.post.created_at)).toLocaleDateString()}</li>
                <li class="tagss">
                  <ul>
                  <i class="fa fa-eye"> </i>
                  {this.props.post.views}
                  </ul>
                </li>
                <li class="tagss">
                  <ul>
                  <i class="fa fa-gear"> </i>
                  {this.props.post.user_id == localStorage.getItem("userId") ? 
                        <>
                        <li>
                          <a href={'/post/'+this.props.post.id+'/edit'}>
                            Edit
                          </a>
                        </li>
                          <li>
                            <button class="dropdown-item" type="button" onClick={this.onClickDelete}>Delete</button>
                          </li>
                          
                        </>
                        :
                        <>
                          <li>
                            <button class="dropdown-item" type="button">Báo cáo</button>
                          </li>
                          <li>

                          </li>
                        </>
                      }
                  </ul>
                </li> 
              </ul>
            </div>
            <div class="description">
              <h1>
                <a href={"/post/" + this.props.post.id}>
                {this.props.post.title}
                </a>
              </h1>
              <div className='tags'>
                {category}
              </div>
              <p>{this.props.post.intro}</p>
              <p class="read-more">
                <a href={"/post/" + this.props.post.id}>Read More</a>
              </p>
            </div>
          </div>
      )
    }
}
  

export default Post;