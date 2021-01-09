import React from 'react'
import axios from 'axios'
import Banner from '../Banner'
import Post from '../Post/post'

class SingleTag extends React.Component {
    constructor(props){
        super([props])
        this.state={
            post: [],
            name : [],
        }
    }

    componentDidMount(){
        axios({
            method : "GET",
            url: "/api/category/"+this.props.match.params.id,
            headers : {
                Authorization: "Bearer" + localStorage.getItem("userToken")
            },
        }).then(res => {
            this.setState({
                post : res.data.category.posts,
                name : res.data.category.name
            })
            console.log(this.state.post)
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
            backgroundImage="url(https://kaopiz-final.s3-ap-southeast-1.amazonaws.com/img/bg-laptop.jpg)"
            title={this.state.name}
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
export default SingleTag