import React, { Component } from 'react';

export class Comment extends Component{
  constructor(props){
    super(props);

    // this.state = {
    //   post: []
    // };
  }

  componentWillMount(){
  }

  componentDidMount() {
  }

  render(){
        return (
            <div className="post-comment" id={this.props.id} parent={parent_id}>
              <h2>{this.props.title}</h2>
              <p>{this.props.user} | {this.props.date}</p>
              <p>{this.props.content}</p>
            </div>
        );
      }
}

export default Comment;
