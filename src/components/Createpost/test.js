import React,{ Component , useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Banner from "../Banner";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

export default class CreatePost  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      editorHtml : "",
      title: "Your Title Here"
    }
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'align': []}],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
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


  options = [
        { label: "PHP", value: "1" },
        { label: "Laravel", value: "2" },
        { label: "Nodejs", value: "3" },
        { label: "Angulajs", value: "4" },
        { label: "JS", value: "5" },
        { label: "Java", value: "6" },
        { label: "Python", value: "7" },
    ];

  handleChange = html => {
    this.setState({editorHtml : html})
    console.log(this.state.editorHtml)
    
  }

  buttonClick = (event) =>{
    this.setState({
      editorHtml: this.state.editorHtml + "<p>AAAA</p>"
    })
    console.log(this.state.editorHtml)
  } 

  titleChange = event => {
    this.setState({
        title: event.target.value
    })
  }


  delta = {
    ops: [{
      insert: 'Hello'
    }, {
      insert: 'World',
      attributes: { bold: true }
    }, {
      insert: {
      image: 'https://kaopiz-final.s3-ap-southeast-1.amazonaws.com/post/1608732438_eEfXqPwoys'
      },
      attributes: { width: 'auto', textAlign : 'center' }
    }]
  };

  handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  render() {
    return (
      <>
      <Banner 
      backgroundImage="url(assets/img/bg-gift.jpg)"
      title="Latest Blog Posts"
      subtitle="Read and get updated on the latest posts"
      />
     
      <main className="main-content"> 
        <form className="p-30 bg-gray rounded" method="POST" data-form="mailer" onSubmit={this.handleSubmit}>
            <div className="row">
            <div className="form-group col-12 ">
                <input className="form-control form-control-lg" type="text" name="title" value={this.state.title} placeholder="Title" onChange={this.titleChange}/>
                {/* {
                        this.state.errors['title'] &&
                        <small className="text-danger">{this.state.errors['title']}</small>

                    } */}
                </div>

            </div>
            <div className="form-group col-12 col-md-6">
            <CreatableSelect
                isMulti
                onChange={this.handleChange}
                options={this.options}
            />
                </div>
        </form>
          <div className="row" style={{height: "1000px", padding: "10px"}}>
            <div className="col-6">
            <div className="text-editor" >
                <ReactQuill 
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}  
                    defaultValue={this.delta}
                    value={this.state.editorHtml}
                    style={{height: '45rem'}}
                    onChange={this.handleChange}
                >
                </ReactQuill>
            </div>
            </div>
            <div className="col-6 " >
            <div className="container" style={{height: "46px"}}>
                Bài viết
            </div>
                <div className="ql-editor">
                <div dangerouslySetInnerHTML={{ __html : this.state.editorHtml} } />
                </div>
            </div>
        </div>
      </main>
      
      
      <button onClick={this.buttonClick}>
        click me
      </button>
      </>
    );
  }
  
}

