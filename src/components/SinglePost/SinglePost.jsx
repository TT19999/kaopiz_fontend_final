import React from 'react';
import axios from 'axios'
import Banner from '../Banner';
import Image from 'react-bootstrap/Image'
import Comments from './comments/comments';
import Post from '../Post/post';

class SinglePost extends React.Component {

    constructor(props){
        super(props)
        this.state={
            post:[],
            user: [],
            avatar: "",
            statistic: [],
            owner:[],
            comments: [],
            comment: '',
            is_follow: false,
            userPost : [],
            
        }
    }

     componentDidMount()  {
        axios({
              method:'GET',
              url: '/api/post/show',
              headers : {
                  Authorization: "Bearer" + localStorage.getItem("userToken")
              },
              params: {
                post_id : this.props.match.params.id,
              }
        }).then(res => {
          this.setState({
            post: res.data.post,
            statistic : res.data.post.statistic,
            owner : res.data.owner,
            comments: res.data.post.comments,
            is_follow: res.data.is_follower,

          })
            var userPost = res.data.owner.post
            userPost.splice(3, userPost.length-1)
            this.setState({
              userPost : userPost
            })
        }).catch(errors => {
          console.log(errors.response);
          window.location.replace('/')
        })
    }

    onCommentChange = event => {
      this.setState({
        comment : event.target.value
      })
    }

    submitComment = event => {
      event.preventDefault()

      axios({
        method : "POST",
        url : "/api/post/"+this.state.post.id+"/comment",
        data : {
          post_id : this.state.post.id,
          comment : this.state.comment
        },
        headers : {
          Authorization: "Bearer" + localStorage.getItem("userToken")
        },
      }
      ).then(res => {
        console.log(res)
        var data = this.state.comments
        data.unshift({
          id : res.data.comment.id,
          comment: res.data.comment.comment,
          created_at: res.data.comment.created_at,
          post_id: res.data.comment.post_id,
          updated_at: res.data.comment.updated_at,
          user_id: res.data.comment.user_id,
          user : {
            id : localStorage.getItem('userId'),
            name : localStorage.getItem('userName'),
            avatar : localStorage.getItem('avatar')
          }
        })
        this.setState({
          comments : data,
          comment : ''
        })
      })
    }
    onDeleteComment = ( event,id) => {
      event.preventDefault()
      axios({
            method: "DELETE",
            url: "/api/comment/delete",
            data : {
                id : id,
            },
            headers : {
                Authorization: "Bearer" + localStorage.getItem("userToken")
            },
        }).then(res => {
            console.log(res)
            this.setState({ 
              comments: this.state.comments.filter(res => res.id !== id ) 
              });
        })
    }

    onEditComment = (event,id,new_comment) => {
      event.preventDefault()
      axios({
        method : "POST",
        url: "/api/comment/edit",
        headers : {
          Authorization: "Bearer" + localStorage.getItem("userToken")
        },
        data : {
          "id" : id,
          "comment" : new_comment
        }
      }).then(res=>{
        this.setState(prevState => ({
          comments: prevState.comments.map(
            old_comment => old_comment.id === id ? { ...old_comment, comment: res.data.comment.comment } : old_comment
          )
        }))
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
          "id" : this.state.owner.id,
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
          const category = this.state.post.categories ? this.state.post.categories.map(res => {
            return <a className="badge badge-pill badge-default" href={'/tags/'+res.id}>{res.name + "  " + res.posts_count}</a>
            }) : <></>

          const comments = this.state.comments ? this.state.comments.map( res => {
            return <Comments data={res} delete={this.onDeleteComment} edit ={this.onEditComment}/>
          }) : <></>
          const userPost = this.state.userPost !== [] ? this.state.userPost.map(post =>{
              return <Post post={this.state.userPost[0]} />
          }) : <></>
          // <>
          //   <p> a</p>
          // </> 
          // :
          // <>
          // </>
        return (
          <>
        <div>
  {/* Header */}
  {/* <header className="header header-inverse w-fullscreen pb-80" style={{backgroundImage: this.state.post.cover }} data-overlay={8}>
    <div className="container text-center">
      <div className="row h-full">
        <div className="col-12 col-lg-8 offset-lg-2 align-self-center">
          <p className="opacity-70">News</p>
          <br />
          <h1 className="display-4 hidden-sm-down">{this.state.post.title}</h1>
          <br />
          <br />
          <p>
            <span className="opacity-70 mr-8">By</span>
            <a className="text-white" href={"/user/profile/"+ this.state.user.id }>{this.state.post.author}</a>
          </p>
          <p>
          <date>{new Date(Date.parse(this.state.post.created_at)).toLocaleDateString()}</date>
          </p>
        </div>
        <div className="col-12 align-self-end text-center">
          <a className="scroll-down-1 scroll-down-inverse" href="#" data-scrollto="section-content">
            <span />
          </a>
        </div>
      </div>
    </div>
  </header> */}
  <Banner 
    backgroundImage={"url("+this.state.post.cover+")"}
    title="Enjoy this blog"
    subtitle="Please, like and share for more people"

  ></Banner>
  {/* END Header */}
  {/* Main container */}
  <main className="main-content" style={{paddingTop: '5px'}}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-xl-8">
            <h1>{this.state.post.title}</h1>
            <div className="gap-multiline-items-1 mt-30" style={{ "box-sizing" : "border-box"}}>
              {category}
            </div>
            <hr/>
            <p>
              Bởi <a href={"/user/profile/"+ this.state.owner.user_id }> {this.state.post.author} </a> 
              vào ngày <date>{new Date(Date.parse(this.state.post.created_at)).toLocaleDateString()}</date>
            </p>
            <hr/>
            <div className="ql-snow">
              <div className="ql-editor">
                    <div dangerouslySetInnerHTML={{ __html : this.state.post.content} } />
              </div>
            </div>
            
            {/* <div className="gap-multiline-items-1 mt-30">
              {category}
            </div> */}
          </div>
          <div className="col-12 col-xl-4" >
            
            <div className="text-center">
              <div className="container" style={{borderLeft: "1px solid black"}}>
                <div className="row">
                  <div className="col-12 col-xl-6">
                    <h5>luot xem</h5>
                    <h5>{this.state.post.views}</h5>
                  </div>
                  <div className="col-12 col-xl-6" style={{borderLeft: "1px solid black"}}>
                    <h5>luot binh luan</h5>
                    <h5>{this.state.post.comments_count}</h5>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-12 col-xl-4">
                    <Image src={this.state.owner.avatar} className="img-circle avatar" style={{width: "75px" , height:"75px"}}></Image>
                  </div>
                  <div className="col-12 col-xl-8">
                    <h4><a href={"/user/profile/"+ this.state.owner.id }> {this.state.owner.name} </a></h4>
                    <p>tham gia từ : <date>{new Date(Date.parse(this.state.owner.created_at)).toLocaleDateString()}</date></p>
                    <p> số lượng blog : {this.state.owner.post_count}</p>
                    <p>số lượng follow: {this.state.owner.follower_count}</p>
                  {this.state.is_follow == false ? 
                  <>
                    {this.state.owner.id == localStorage.getItem('userId') ? 
                    <a href={'/post/'+this.state.post.id+'/edit'}>
                    <button type="button" className="btn btn-primary" >
                      Edit
                    </button> 
                    </a> :
                    <button type="button" className="btn btn-primary" onClick={this.onClickFollow}>
                      Follow
                    </button>
                     }
                  </>
                  :
                  <>
                  <button type="button" className="btn btn-primary" onClick={this.onClickFollow}>
                    UnFollow
                  </button>
                  </>
                  }
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

    </div>
    {/*
|‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
| Comments
|‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
!*/}
    
  </main>
  {/* END Main container */}
</div>
  <div className="bt-1 bg-grey" style={{paddingTop:"10px"}}>
  <div className="container">
    <div className="row">
        <div className="col-8">
        {/* <div className="float-left image">
                <img src={localStorage.getItem("avatar")} className="img-circle avatar" alt=""/>
                <label for="comment">{localStorage.getItem("userName")}</label>
            </div> */}
          <div className="card card-white post bg-grey">
            <div className="post-heading">
                <div className="float-left image">
                    <img src={localStorage.getItem("avatar")} className="img-circle avatar" alt=""/>
                </div>
                <div className="float-left meta">
                    <div className="title h5">
                        <p>{localStorage.getItem("userName")}</p>
                    </div>
                </div>
            </div> 
        </div>
            <p></p>
          <form onSubmit={this.submitComment}>
            <div class="form-group">
              
              <textarea name="comment" name="comment" value={this.state.comment} onChange={this.onCommentChange} class="form-control" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" >Send</button>
          </form>
          <p></p>
          {comments}
      </div>
    </div>
  </div>
  </div>


  <div className="bt-1 bg-grey" style={{paddingTop:"10px"}}>
  <div className="container">
    <div className="row">
        <div className="col-8">
        {/* <div className="float-left image">
                <img src={localStorage.getItem("avatar")} className="img-circle avatar" alt=""/>
                <label for="comment">{localStorage.getItem("userName")}</label>
            </div> */}
          <div className="card card-white post bg-grey">
            <div className="post-heading">
                <div className="float-left meta">
                    <div className="title h5">
                        <p>Bài viết cùng tác giả </p>
                    </div>
                </div>
            </div> 
          </div>
          <p></p>
           {/* {this.state.owner.post !== [] ? <Post post={this.state.owner.post} /> : <></>}  */}
          {/* <Post post={} />
          <Post post={} /> */}
          {userPost}
      </div>
    </div>
  </div>
  </div>


  </>
  )
}
};

export default SinglePost;