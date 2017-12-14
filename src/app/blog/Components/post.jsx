import React, { Component } from 'react';
import { Link } from 'react-router';
import Comment from './comment.jsx';
import * as BlogServer from '../BlogServer.js';

export class Post extends Component{
  constructor(props){
    super(props);
    console.log('props and stuff', props, this);
    this.state = {post: [], comments: []};
  }

  componentWillMount(){
    if(this.props.location['state'] === undefined){
      console.log('spawned without data');

      //this.setState({post: {id:'', postId:'', parent_id:'', user:'', datecontent:'' }});
      this.GetCurrentPost();
      this.GetComments();

    }else{
      console.log('Post state', this.props.location['state'].post);
      this.setState({post: this.props.location['state'].post});
      this.GetComments();
    }
  }

  componentDidMount() {
  }

  GetCurrentPost(){
    var self = this;

    var id = this.props.params.id;
    BlogServer.getPostByID(id).then(function(data){
      data = JSON.parse(data);
      return data;
    }).then(function(data){
      self.setState({post: data});
    });
  }

  GetComments(){
    var self = this;
    var id = this.props.params.id;

    BlogServer.getCommentsByPostID(id).then(function(data){
      data = JSON.parse(data);
      return data;

    }).then(function(data){
      console.log('GetComments', data);

      var sortedPosts = data.sort((a,b) => {
        return new Date(a.parent_id).getTime() - new Date(b.parent_id).getTime();
      }).reverse();

      self.setState({comments: data});
    });
  }


  handleChange(event) {
    this.setState({author: event.target.value});
  }

  handleTextChange(event) {
    this.setState({comment: event.target.value});
  }

  handleSubmit(event) {
    console.log('An essay was submitted: ' + this.state.value);

    var comment = {
    "id": this.props.id,
    "postId": this.props.postId,
    "parent_id": this.props.parent || null, // Parent comment for replies, is `null` if top-level comment
    "user": this.state.author,          // Name of commenter
    "date": this.props.date,          // Date of comment in YYYY-MM-DD format
    "content": this.state.comment        // Comment content
    }

    BlogServer.PostCommentsByPostID(this.state.post.postId, comment);
    event.preventDefault();
  }

  render(){
      let comments = this.state.comments.map((item,i) => {
        return (<Comment  key={i} id={item.id} content={item.content} date={item.date} parent_id={item.parent_id} postId={item.postId} user={item.user} />)
      })

        return (
            <div className="post-content" id={this.state.post.id}>
              <h2>{this.state.post.title}</h2>
              <p>{this.state.post.author} | {this.state.post.publish_date}</p>
              <div dangerouslySetInnerHTML={{ __html: this.state.post.content }} />
              <Link to={"/blog"}>Back</Link>

              <h3>Comments</h3>
              <div className="post-comments">
                View comments here
                {comments}
              </div>

              <h3>Add Comment</h3>
              <div className="post-add-comments">
              <form onSubmit={this.handleSubmit}>
                <label>
                  Name:<br/>
                  <input type="text" value={this.state.author} onChange={this.handleChange} />
                </label>
                <br/>
                <label>
                  Comment Text:<br/>
                  <textarea type="text" value={this.state.comment} onChange={this.handleTextChange} />
                </label>
                <br/><input type="submit" value="Submit" />
              </form>
              </div>

            </div>
        );
      }
}

export default Post;
