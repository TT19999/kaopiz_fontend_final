import React from 'react';
import Select from 'react-select';
import Banner from './../Banner';
import { validateAll } from 'indicative';
import axios from 'axios';
import Demo from './Demo';

class Createpost extends React.Component {

    constructor(props){
        super(props)
        this.state={
           title:'',
           content:'',
           conclusion:'',
           intro:'',
           author:'',
           cover:'',
           errors:[],
            category: [],
            selects: [],
        }
    }

    options = [
        { label: "PHP", value: "1" },
        { label: "Laravel", value: "2" },
        { label: "Nodejs", value: "3" },
        { label: "Angulajs", value: "4" },
        { label: "JS", value: "5" },
        { label: "Java", value: "6" },
        { label: "Python", value: "7" },
      ];

    componentDidMount(){
        axios.get("/api/category").then(res => {
            this.setState({
                category : res.data.category
            })
        })
    }

    onSelectedOptionsChange= (event) => {
        this.setState({
            category : event ? event.map(x => x.value) : [],
            selects : event ? event.map(x => x.label) : []
        })
        console.log(this.state.category)
    }

    onHandleInputChange= event =>{
        this.setState({
            [event.target.name] : event.target.value,
            errors: [],
        })
    }

    rules = {
        title:  'required|string|max:255',
        content:'required',
        author: 'required',
        intro: 'required',
        conclusion: 'required',
        cover: 'required|string'
      };
       messages = {
        required: 'The {{ field }} is required.',
        max : 'the title max 255',
      }
      handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        // validating user data
        const data = {
            title : this.state.title,
            content : this.state.content,
            conclusion : this.state.conclusion,
            intro : this.state.intro,
            author : this.state.author,
            cover : this.state.cover,
            category: this.state.category,
            status : "public"
        };
    
        
        validateAll(data,this.rules, this.messages)
        .then(async () => {
          //successfull login
          await axios.post('/api/post', data, {
              headers: {'Authorization' : 'Bearer ' + localStorage.getItem("userToken")}
          }).then(res =>  {
            window.location.replace('/post/' + res.data.post.id)
          }).catch(errors => {
            console.log(errors.response);
            alert(errors.response.data.errors)
          })
        })
        .catch(errors => {
          console.log('a')
          console.log(errors);
          const formattedErrors = {}
          errors.forEach(error => formattedErrors[error.field] = error.message)
          this.setState({
            errors: formattedErrors
          })
        })
      }

      onCoverChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            var data = new FormData()
            data.append("cover", img)
            axios.post('/api/post/cover/update',data, {
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem("userToken")
                }
            }).then(res => {
                console.log(res)
                this.setState({
                    cover : res.data.cover
                })
                console.log(this.state.cover)
                alert(res.data.message)
            }).catch(errors => {
                alert(errors.response.data.errors)
            })
          }
    }

    render(){
        return (
        <div>
        <Banner
        backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`}
        title="Write New Post"
        />
        {/* END Header */}
        {/* Main container */}
        <main className="main-content">
            <section className="section">
            <div className="container">
                <div className="row">
                <div className="col-12 col-lg-12">
                    <form className="p-30 bg-gray rounded" method="POST" data-form="mailer" onSubmit={this.handleSubmit}>
                    <div className="row">
                    <div className="form-group col-12 ">
                        <input className="form-control form-control-lg" type="text" name="title" placeholder="Title" onChange={this.onHandleInputChange}/>
                        {
                                this.state.errors['title'] &&
                                <small className="text-danger">{this.state.errors['title']}</small>

                            }
                        </div>

                    </div>
                    <div className="row">
                        <div className="form-group col-md-12 my-5">
                        <input type="file" className="form-control" name="cover" onChange={this.onCoverChange}/>
                        {
                                this.state.errors['cover'] &&
                                <small className="text-danger">{this.state.errors['cover']}</small>

                        }
                        </div>
                        <div className="form-group col-12 col-md-6">
                        <input className="form-control form-control-lg" type="text" name="author" placeholder="Author" onChange={this.onHandleInputChange}/>
                        {
                                this.state.errors['author'] &&
                                <small className="text-danger">{this.state.errors['author']}</small>

                            }
                        </div>
                        <div className="form-group col-12 col-md-6">
                        <Select
                                    isMulti
                                    name="category"
                                    options={this.options}
                                    onChange={this.onSelectedOptionsChange}
                                    className="basic-multi-select"
                                    classNamePrefix="Category"
                                    placeholder="Category"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control form-control-lg" rows={2} placeholder="Intro" name="intro" defaultValue={""}  onChange={this.onHandleInputChange}/>
                        {
                                this.state.errors['intro'] &&
                                <small className="text-danger">{this.state.errors['intro']}</small>

                            }
                    </div>
                    <div className="form-group">
                        <textarea className="form-control form-control-lg" rows={4} placeholder="Content" name="content" defaultValue={""}  onChange={this.onHandleInputChange}/>
                        {
                                this.state.errors['content'] &&
                                <small className="text-danger">{this.state.errors['content']}</small>

                            }
                    </div>
                    <div className="form-group">
                        <textarea className="form-control form-control-lg" rows={2} placeholder="Conclusion" name="conclusion" defaultValue={""}  onChange={this.onHandleInputChange}/>
                        {
                                this.state.errors['conclusion'] &&
                                <small className="text-danger">{this.state.errors['conclusion']}</small>

                            }
                    </div>
                    <div className="text-center">
                        
                        <button className="btn btn-lg btn-primary" type="submit">Create Post</button>
                    </div>
                    <div className="text-md-right" >
                        <Demo data={this.state}/>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            </section>
        </main>
        {/* END Main container */}
        </div>

  );
};
}
export default Createpost;