import React, { Component } from 'react';
import { Link } from 'react-router';

export class Post extends Component{
  constructor(props){
    super(props);

    // this.state = {
    //   post: []
    // };
  }

  componentWillMount(){
    console.log('Post state', this.props.location['state'].post);
    this.setState({post: this.props.location['state'].post});
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps', nextProps);
  }

  getCommentsForPost(){
    var self = this;
    fetch('http://localhost:9001/' + this.state.post.id + '/comments').then(
      function(response){
        console.log('getCommentsForPost response', response);
        return response.json();
      })
      .then(function(data){
        console.log('getCommentsForPost data', data);

        var sortedComments = data.sort((a,b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        }).reverse();

        return sortedComments;
      }).then(function(data){
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
            </div>
        );
      }
}

export default Post;
