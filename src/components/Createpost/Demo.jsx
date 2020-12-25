import React from 'react'

class Demo extends React.Component {

    constructor(props){
        super(props)
        this.state={
            show : false
        }
    }

    handeOnClick= (event) =>{
        this.setState({
            show: !this.state.show
        })
    }
    render(){

        const category = this.props.data.selects ? this.props.data.selects.map(res => {
            return <a className="badge badge-pill badge-default">{res}</a>
        }) : <></>

        return (
            <>
            
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={this.handeOnClick}>
                    Demo
                    </button>
                   {this.state.show ?  <div>
                {/* Header */}
                <header className="header header-inverse pb-80" style={{backgroundImage: this.props.data.cover }} data-overlay={8}>
                    <div className="container text-center">
                    <div className="row h-full">
                        <div className="col-12 col-lg-8 offset-lg-2 align-self-center">
                        <h1 className="display-4 hidden-sm-down">{this.props.data.title}</h1>
                        <br />
                        <br />
                        <p>
                            <span className="opacity-70 mr-8">By</span>
                            <a className="text-white" >{this.props.data.author}</a>
                        </p>
                        <p>
                            <img className="rounded-circle w-60" src={this.props.data.avatar} alt="..." />
                        </p>
                        </div>
                        <div className="col-12 align-self-end text-center">
                        {/* <a className="scroll-down-1 scroll-down-inverse" href="#" data-scrollto="section-content">
                            <span />
                        </a> */}
                        </div>
                    </div>
                    </div>
                </header>
                {/* END Header */}
                {/* Main container */}
                <main className="main-content text-left">
                    <div className="section" id="section-content">
                    <div className="container">
                        <div className="row">
                        <div className="col-12 col-lg-8 offset-lg-2">
                            <img src={this.props.data.cover} />
                            <hr className="w-100" />
                            <h5>Intro</h5>
                            <p className="lead">{this.props.data.intro}</p>
                            <hr className="w-80" />
                            <h5>Content</h5>
                            <p>{this.props.data.content}
                            </p>
                            <hr className="w-80" />
                            <h5>Conclusions</h5>
                            <p>{this.props.data.conclusion}
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
                </main>
                {/* END Main container */}
                </div> :<></> }
            </>
        )
    }
}

export default Demo