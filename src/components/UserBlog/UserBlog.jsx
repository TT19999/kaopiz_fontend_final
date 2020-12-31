import React from 'react'
import Banner from '../Banner'
import axios from 'axios'
import Post from '../Post/post'
import UserPost from '../Post/UserPost'

class UserBlog extends React.Component {
    constructor(props){
        super(props)
        this.state={
            post:[],
            user:[],
        }
    }
    
    componentDidMount(){
        axios.get("/api/post/user",{
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem("userToken")
            }
        }).then(res =>{
            console.log(res);
          this.setState({
            post: res.data.post,

          })
          console.log(res);
        }).catch(errors =>{
        //   alert(errors.response.data.errors)
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
        return(
            <div>
            <Banner
            backgroundImage="url(assets/img/bg-gift.jpg)"
            title="Your Blog"
            />
            <main className="main-content bg-gray">      
          <section class="blog-cards-wrapper">
          {RenderPost}
          </section>
            </main>

            </div>
            
        )
    }
}
export default UserBlog;