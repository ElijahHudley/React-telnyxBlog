/**
 * @overview Blog page.  Renders static content.
 **/
import React, { Component } from 'react';
import { Route, Redirect, browserHistory } from 'react-router';

import Post from './Components/post.jsx';

// Render static HTML:
import __html from './blog.html';

class Blog extends Component {
  constructor(props){
    console.log('BLOG', props);
    super(props);

    this.state = {
      posts: []
    };
  }

  componentWillMount(){
    console.log('componentWillMount');
    this.GetBlogPosts();
  }

  GetBlogPosts(){
    var self = this;
    fetch('http://localhost:9001/posts').then(
      function(response){
        console.log('response', response);
        return response.json();
      })
      .then(function(data){
        var sortedPosts = data.sort((a,b) => {
          return new Date(a.publish_date).getTime() - new Date(b.publish_date).getTime();
        }).reverse();

        return sortedPosts;
      }).then(function(data){
        self.setState({posts: data});

      });
  }

  renderPost(itemID){
    console.log('renderPost', itemID);
    var post = {};
    for(var c in this.state.posts){
      if(this.state.posts[c].id === itemID){
        post = this.state.posts[c];
        break;
      }
    }

    if(post !== null){
      console.log('post', post);
      browserHistory.push({pathname: "/post/" + post.slug, state: {post: post}});
    }
  }


  render(){
    let posts = this.state.posts.map((item, i) =>
      {return <div key={i} id={i} onClick={(id) => this.renderPost(item.id)} >
      <div className="post" id={item.id}>
        <h2>{item.title}</h2>
        <p>{item.author} | {item.publish_date}</p>
        <p>{item.description}</p>
      </div></div>
      });

    return (
        <div className="content">
          {posts}
        </div>
      );
  }
}

// const Blog = () => <div dangerouslySetInnerHTML={{ __html }}/>;

export default Blog;
