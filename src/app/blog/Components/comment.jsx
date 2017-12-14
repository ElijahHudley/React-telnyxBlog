import React, { Component } from 'react';
import AddComment from './addComment.jsx';

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
    var today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        return (
          <div id={this.props.id} className="comment">
            <span>{this.props.user} : {this.props.date}</span>
            <p>{this.props.content}</p>
            <AddComment postId={this.props.postId} id={Math.floor(Math.random() * 1000)} parent={this.props.parent_id} date={date}/>
          </div>
          );
      }
}

export default Comment;
