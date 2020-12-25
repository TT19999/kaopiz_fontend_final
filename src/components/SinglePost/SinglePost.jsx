import React from 'react';
import axios from 'axios'

class SinglePost extends React.Component {

    constructor(props){
        super(props)
        this.state={
            post:[],
            user: [],
            avatar: "",
            
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
          console.log(res.data.post.categories)
          this.setState({
            post: res.data.post
          })
            console.log("a")
        }).catch(errors => {
          console.log(errors.response);
          // errors.response ?  alert(errors.response.data.errors) 
          // window.location.replace('/')
        })
    }

    render(){
          const category = this.state.post.categories ? this.state.post.categories.map(res => {
            return <a className="badge badge-pill badge-default" href={'/post/category/'+res.name}>{res.name}</a>
        }) : <></>
        return (
        <div>
  {/* Header */}
  <header className="header header-inverse w-fullscreen pb-80" style={{backgroundImage: this.state.post.cover }} data-overlay={8}>
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
  </header>
  {/* END Header */}
  {/* Main container */}
  <main className="main-content">
    <div className="section" id="section-content">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <img src={this.state.post.cover} />
            <hr className="w-100" />
            <h5>Intro</h5>
            <p className="lead">{this.state.post.intro}</p>
            <hr className="w-80" />
            <h5>Content</h5>
            <p>{this.state.post.content}
            </p>
            <hr className="w-80" />
            <h5>Conclusions</h5>
            <p>{this.state.post.conclusion}
            </p>
            <hr className="w-80" />
            <div className="gap-multiline-items-1 mt-30">
              {category}
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
    <div className="section bt-1 bg-grey">
      <div className="container">
        <div className="row text-center">
          <div className="text-center p-5">
            COMMENTS HERE.
          </div>
        </div>
      </div>
    </div>
  </main>
  {/* END Main container */}
</div>

  )
}
};

export default SinglePost;