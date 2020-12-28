import React from 'react'

export default class Comments extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            
                <div className="container">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <div className="card card-white post bg-grey">
                                <div className="post-heading">
                                    <div className="float-left image">
                                        <img src={this.props.data.user.avatar} className="img-circle avatar" />
                                    </div>
                                    <div className="float-left meta">
                                        <div className="title h5">
                                            <a href={"/user/"+this.props.data.user_id}><b>{this.props.data.user.name}</b></a>
                                        </div>
                                        <h6><date>{new Date(Date.parse(this.props.data.created_at)).toLocaleString()}</date></h6>
                                    </div>
                                </div> 
                                <div className="post-description"> 
                                    <p>{this.props.data.comment}</p>
                                </div>
                                <hr/>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            
        )
    }
}