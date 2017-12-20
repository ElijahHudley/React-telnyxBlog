import React, { Component } from 'react';
import AddComment from './addComment.jsx';

export class Comment extends Component{
  constructor(props){
    super(props);
    console.log('Comment', props);
  }

  componentWillMount(){
  }

  componentDidMount() {
  }

  render(){
    var today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var type = '';

    if(this.props.type === 2){
      type = ' child-comment';
    }

        return (
          <div id={'comment-'+this.props.id} className={"comment" + type}>
          <span>id: {this.props.id}</span><br/>
          <span>parent: {this.props.parent_id}</span><br/>
          <span>date: {this.props.date}</span><br/>
          <br/>

            <span>{this.props.user} : {this.props.date}</span>
            <p>{this.props.content}</p>
            <AddComment updateComments={() => this.props.updateComments()} showForm={true} postId={this.props.postId} id={Math.floor(Math.random() * 1000)} parent={this.props.id} date={date}/>
          </div>
          );
      }
}

export default Comment;
