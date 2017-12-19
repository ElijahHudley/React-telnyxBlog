import React, { Component } from 'react';
import { Link } from 'react-router';
import Comment from './comment.jsx';
import AddComment from './addComment.jsx';
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
      for(var i in data){
        data[i].children = [];
      }

      var sortedPosts = data.sort((a,b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }).reverse();

      return sortedPosts;

    }).then(function(data){
      console.log('GetComments', data);
      self.setState({comments: data});
    });
  }


  render(){
      let comments = this.state.comments.map((item,i) => {
        return (<Comment updateComments={() => this.GetComments()} key={i} id={item.id} content={item.content} date={item.date} parent_id={item.parent_id} type={item.type} postId={item.postId} user={item.user} />)
      })

      var today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        return (
            <div className="post-content" id={this.state.post.id}>
              <h2>{this.state.post.title}</h2>
              <p>{this.state.post.author} | {this.state.post.publish_date}</p>
              <div dangerouslySetInnerHTML={{ __html: this.state.post.content }} />
              <Link to={"/blog"}>Back</Link>

              <br/>
              <br/>

              <h3>Comments</h3>
              <div className="post-comments">
                View comments here
                {comments}
              </div>

              <br/>
              <br/>

              <h3>Add New Comment</h3>
              <AddComment updateComments={() => this.GetComments()} showForm={false} postId={this.props.params.id} id={Math.floor(Math.random() * 1000)} parent={null} date={date}/>

            </div>
        );
      }
}

export default Post;
