import React, { Component } from 'react';
import { Link } from 'react-router';
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
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }).reverse();

      self.setState({comments: data});
    });
  }

  render(){
        return (
            <div className="post-content" id={this.state.post.id}>
              <h2>{this.state.post.title}</h2>
              <p>{this.state.post.author} | {this.state.post.publish_date}</p>
              <div dangerouslySetInnerHTML={{ __html: this.state.post.content }} />
              <Link to={"/blog"}>Back</Link>

              <h3>Comments</h3>
              <div className="post-comments">
                View comments here
              </div>

              <h3>Add Comment</h3>
              <div className="post-add-comments">
                Add a comment here
              </div>

            </div>
        );
      }
}

export default Post;
