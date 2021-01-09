import React from 'react'
import { validateAll } from 'indicative';
import axios from 'axios';
import config from '../config';

class Verify extends React.Component {
    constructor(props){
        super(props)
        this.state={
            token: "",
            errors: []
        }
    }

    handleInputChange = event =>{
        this.setState({
            [event.target.name] : event.target.value,
            errors: []
        })
    }

    
      handleSubmit = (event) => {
        event.preventDefault()
        axios({
          method : 'POST',
          url : '/api/verify/email',
          data: {
            email : this.state.email
          } 
        }).then(res => {
          alert('Vui long doi trong vai giay')
        }).catch(errors=>{
         alert(errors.response.data.errors)
        })
      }
      render() {
        return (
          <div className="mh-fullscreen bg-img center-vh p-20" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-girl.jpg)`}}>
          <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
          <h5 className="text-uppercase text-center">Verify account</h5>
          <br />
          <h5>Vui lòng xác nhận email</h5>
          <p>Nếu không có email vui lòng nhập lại theo form dưới đây</p>
          <br />
          <form className="form-type-material" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" name="email" placeholder="Email address" onChange={this.handleInputChange}/>
            {
              this.state.errors['email'] &&
              <small className="text-danger">{this.state.errors['email']}</small>
            }
          </div>
          <br />
              <button className="btn btn-bold btn-block btn-primary" type="submit">Gửi Lại Email</button>
          </form>
          <hr className="w-30" />
              <p className="text-center text-muted fs-13 mt-20">Back To Sign in: 
              <a href="/login">Sign in</a>
              </p>
          </div>
          </div>
        )
      }
}
export default Verify