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
        return <div className="tag">{res.name + "  " + res.posts_count}</div>
          }) : <></>
        return (
          <div className="blog-card-grid-space">
          <a className="blogg-card" href={"/post/" + this.props.post.id}>
            <div>
              <h1>{this.props.post.title}</h1>
              <p>{this.props.post.intro}</p>
              <p>By {this.props.post.author}</p>
              <div className="date">{new Date(Date.parse(this.props.post.created_at)).toLocaleDateString()}</div>
              <div className="more">
                <div class="dropdown">
                  <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  </button>
                  <div class="dropdown-menu">
                      {this.props.post.user_id == localStorage.getItem("userId") ? 
                        <>
                          <a href={'/post/'+this.props.post.id+'/edit'}>
                          <button class="dropdown-item" type="button"  data-toggle="modal" data-target="#exampleModal">
                            
                            Sửa
                          </button>
                          </a>
                          <button class="dropdown-item" type="button" onClick={this.onClickDelete}>xóa</button>
                        </>
                        :
                          <>
                          <button class="dropdown-item" type="button">Báo cáo</button>
                          </>
                      }
                      
                      
                  </div>
                </div>
              </div>
              <div className="tags">
                {category} 
              </div>
            </div>
          </a>
        </div>
  );
    }
}
  

export default Post;