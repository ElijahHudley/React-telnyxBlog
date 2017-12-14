import React, { Component } from 'react';

export class Post extends Component{
  constructor(props){
    super(props);
    console.log('Post', props)

    this.state = {
    };
  }

  componentDidMount(){
    console.log('mounted');
  }

  getCommentsForPost(){

  }

    render(){
        return (
            <div className="post" key={this.props.id} id={this.props.id}>
              <h2>{this.props.title}</h2>
              <p>{this.props.author} | {this.props.publish_date}</p>
              <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
            </div>
        );
    }
}

export default Post;
