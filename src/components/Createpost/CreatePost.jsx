import React,{ Component , useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Banner from "../Banner";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';

export default class CreatePost  extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
    var date = today.getDate() + "-" + (today.getMonth()+1)+ "-" + today.getFullYear();
    this.state = {
      text: "",
      editorHtml : "<h2>Your Content</h2>",
      title: "Your Title Here",
      intro: "",
      categories: [{ label: "PNT", value: "PNT" }],
      categoriesDefault: [],
      options: [{ label: "PNT", value: "PNT" },],
      file:'',
      cover : 'https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg',
    }
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'align': []}],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'video'],
      ['clean']
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'align',
    'list', 'bullet', 'indent',
    'link','image', 'video',
  ]


  options = []

    componentDidMount(){
        axios.get('/api/category').then(res => {
            this.setState({
                options: res.data.categories ? res.data.categories.map(x => {
                    console.log(x)
                    var data = ({
                        label : x.name,
                        value : x.name
                    })
                    return data
                }) : []
            })
            console.log(this.state.options)
        })

    }

  handleInputChange = html => {
    this.setState({editorHtml : html})
    console.log(this.state.editorHtml)
    
  }

  buttonClick = (event) =>{
    this.setState({
      editorHtml: this.state.editorHtml
    })
    console.log(this.state.editorHtml)
  } 

  onClickSave = event =>{
      console.log(this.state.categories)
      const data= ({
        categories : this.state.categories,
        title : this.state.title,
        content : this.state.editorHtml,
        author : localStorage.getItem('userName'),
        intro : this.state.intro,
        status : "public",
        cover : this.state.cover,
      })
      
      console.log(data)
         axios.post('/api/post', data, {
        headers: {'Authorization' : 'Bearer ' + localStorage.getItem("userToken")}
        }).then(res =>  {
            console.log(res)
            window.location.replace('/post/' + res.data.post.id)
        }).catch(errors => {
            console.log(errors.response);
            alert(errors.response.data.errors)
        })
  }

  titleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    })
  }

  handleImageChange = event => {
    console.log(event.target)
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      var data = new FormData()
      data.append("image", img)
      axios.post('/api/image/create',data, {
          headers : {
              'Authorization' : 'Bearer ' + localStorage.getItem("userToken")
          }
      }).then(res => {
        this.setState({
          editorHtml : this.state.editorHtml + '<img src="'+res.data.path+'" />'
        })
      }).catch(errors => {
          console.log(errors.response);
          alert(errors.response.data.errors)
      })
    }
  }

  handleCoverChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      var data = new FormData()
      data.append("image", img)
      axios.post('/api/image/create',data, {
          headers : {
              'Authorization' : 'Bearer ' + localStorage.getItem("userToken")
          }
      }).then(res => {
        this.setState({
          cover : res.data.path,
        })
      }).catch(errors => {
          console.log(errors.response);
          alert(errors.response.data.errors)
      })
    }
  }

  handleChange = (newValue, actionMeta) => {
    console.log(newValue);  
    this.setState({
        // categories : newValue ? newValue.map(x => x.value) : [],
        categories : newValue,
    })
  };

  render() {
    return (
      <>
      <Banner 
      backgroundImage={"url("+this.state.cover+")"}
      title="Latest Blog Posts"
      subtitle="Read and get updated on the latest posts"
      />
     
      <main className="main-content"> 
        <form className="p-30 bg-gray rounded" method="POST" data-form="mailer" onSubmit={this.handleSubmit}>
            <div className="row">
            <div className="form-group col-12 ">
                <input className="form-control form-control-lg" type="text" placeholder="Nhập title nổi bật" name="title" value={this.state.title} onChange={this.titleChange}/>
                {/* {
                        this.state.errors['title'] &&
                        <small className="text-danger">{this.state.errors['title']}</small>

                    } */}
                </div>

            </div>
            <div className="form-group">
                <textarea className="form-control form-control-lg" rows={2} placeholder="Tóm tắt chủ đề bài viết" name="intro" defaultValue={""}  onChange={this.titleChange}/>
                {/* {
                        this.state.errors['intro'] &&
                        <small className="text-danger">{this.state.errors['intro']}</small>

                    } */}
            </div>
            <div class="form-group">
              <label htmlFor='imageInput112' >Chon Ảnh bìa cho bài viết </label>
              <input type="file" class="form-control-file" id='imageInput112'  onChange={this.handleCoverChange}/>
            </div>
            
            <div className="form-group col-12 col-md-6">
            <CreatableSelect
                isMulti
                closeMenuOnSelect={false}
                defaultValue={[this.state.options[0]]}
                onChange={this.handleChange}
                options={this.state.options}
            />
                </div>
        </form>
          <div className="row" style={{minHeight: "45rem", padding: "10px"}}>
            <div className="col-6">
            <div className="text-editor" >
                <ReactQuill 
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}  
                    value={this.state.editorHtml}
                    style={{height: '45rem'}}
                    onChange={this.handleInputChange}
                >
                </ReactQuill>
            </div>
            </div>
            <div className="col-6 " >
            <div className="container" style={{height: "50px"}}>
                Bài viết
            </div>
            <div className="text-editor" >
              <div className='quill'>
                <ReactQuill 
                  theme="bubble"
                    readOnly
                    value={this.state.editorHtml}
                    style={{height: '45rem'}}
                >
                </ReactQuill>
              </div>
            </div>
            </div>
            <form>
            <div class="form-group" style={{paddingLeft:'20px'}}>
              <label htmlFor='imageInput' >Thêm ảnh vào bài viết </label>
              <input type="file" class="form-control-file" id='imageInput'  onChange={this.handleImageChange}/>
            </div>
          </form>
        </div>
        
      </main>

      
      
      <button type="submit" className="btn btn-primary" style={{textAlign : 'center', marginLeft : '850px', marginBottom:'20px'}} onClick={this.onClickSave}>
          Đăng bài
      </button>
      </>
    );
  }
  
}

