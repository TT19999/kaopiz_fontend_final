import React from 'react' 
import axios from 'axios'
import Banner from '../Banner';
import Post from '../Post/post';

class Search extends React.Component {
    constructor(props){
        super(props)
        const search =props.location.search;
        const params = new URLSearchParams(search);
        this.state={
            search : params.get('p'),
            post: []
        }
    }

    componentDidMount (){
        axios({
            method: 'GET',
            url: '/api/search',
            params : {
                key_word : this.state.search
            },
            headers : {
                Authorization: "Bearer" + localStorage.getItem("userToken")
            },
        }).then(res=>{
            this.setState({
                post : res.data.post
            })
            console.log(res.data)
        }).catch(err =>{
            console.log(err.response)
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
            <>
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
            </>
        )
    }
}

export default Search