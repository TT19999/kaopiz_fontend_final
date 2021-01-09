import React from 'react'
import axios from 'axios'
import Banner from '../Banner'
import ReactQuill from 'react-quill'
import CreatableSelect from 'react-select/creatable';

class EditPost extends React.Component {
    constructor(props){
        super(props)
        this.state={
            title:'',
            content:'',
            intro :'',
            categories : [],
            options : [],
            post: [],
            selected : false,
            cover : ''
        }
    }

    modules = {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'align': []}],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link'],
          ['clean']
        ],
      }
    
      formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'align',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]

    componentDidMount(){
        axios({
            method:"GET",
            url:"/api/post/"+this.props.match.params.id+"/edit",
            headers : {
                Authorization: "Bearer" + localStorage.getItem("userToken")
            },
        }).then(res=>{
            this.setState({
                post : res.data.post,
                title : res.data.post.title,
                content : res.data.post.content,
                intro : res.data.post.intro,
                cover : res.data.post.cover,
                categories : res.data.post.categories ? res.data.post.categories.map(x => {
                    console.log(x)
                    var data = ({
                        label : x.name,
                        value : x.name,
                    })
                    return data
                }) : [],
            })
            console.log(this.state.categories)
        })
        axios.get('/api/category').then(res => {
            this.setState({
                options: res.data.categories ? res.data.categories.map(x => {
                    var data = ({
                        label : x.name,
                        value : x.name,
                        is_selected : false,
                    })
                    return data
                }) : []
            })
            this.state.categories.forEach( category => {
                    this.setState(prevState=>({
                        options : prevState.options.map(
                            old_options => old_options.value == category.value ? { ...old_options, is_selected: true } : old_options
                        )
                    })
                    )
            })
            this.setState({
                selected : true,
            }
            )
        })
    }

    handleInputChange = html => {
        this.setState({content : html})
        console.log(this.state.content)
        
      }

    onHandelInputChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
        console.log(this.state.title)
    }

    onClickSave = (event) => {
        event.preventDefault()
        axios({
            method : "PUT",
            url : "/api/post/"+ this.state.post.id,
            data : {
                title: this.state.title,
                content : this.state.content,
                intro: this.state.intro,
                status : "public",
                author : localStorage.getItem('userName'),
                categories : this.state.categories,
                cover : this.state.cover
            },
            headers : {
                Authorization: "Bearer" + localStorage.getItem("userToken")
            },
        }).then(res=> {
            window.location.replace('/post/'+this.state.post.id)
        }).catch(err =>{
            console.log(err.response)
        })
    }

    handleChange = (newValue, actionMeta) => {
        console.log(newValue);  
        this.setState({
            // categories : newValue ? newValue.map(x => x.value) : [],
            categories : newValue,
        })
    };

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

    render(){
        return(
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
                <input className="form-control form-control-lg" type="text" placeholder="Nhập title nổi bật" name="title" value={this.state.title} onChange={this.onHandelInputChange}/>
                {/* {
                        this.state.errors['title'] &&
                        <small className="text-danger">{this.state.errors['title']}</small>

                    } */}
                </div>

            </div>
            <div className="form-group">
                <textarea className="form-control form-control-lg" rows={2} placeholder="Tóm tắt chủ đề bài viết" name="intro" defaultValue={""} value={this.state.intro}  onChange={this.onHandelInputChange}/>
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
                {this.state.selected == false ? <></> : 
                <CreatableSelect
                    isMulti
                    closeMenuOnSelect={false}
                    defaultValue={this.state.options.filter(option => option.is_selected == true)}
                    onChange={this.handleChange}
                    options={this.state.options}
                />
                }
            
                </div>
            </form>
          <div className="row" style={{height: "1000px", padding: "10px"}}>
            <div className="col-6">
            <div className="text-editor" >
                {this.state.title !== '' ? <ReactQuill 
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}  
                    value={this.state.content}
                    style={{height: '45rem'}}
                    onChange={this.handleInputChange}
                >
                </ReactQuill> : <></>}
                
            </div>
            </div>
            <div className="col-6 " >
            <div className="container" style={{height: "46px"}}>
                Bài viết
            </div>
            <div className="text-editor" >
              <div className='quill'>
                <ReactQuill 
                  theme="bubble"
                    readOnly
                    value={this.state.content}
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
            
        )
    }

}

export default EditPost