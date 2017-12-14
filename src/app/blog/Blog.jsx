/**
 * @overview Blog page.  Renders static content.
 **/
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';

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

  componentDidMount(){
    console.log('mounted');
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
        console.log('response data', data);
        self.setState({posts: data});
      });
  }

  renderPost(item){
    console.log('renderPost', item);
    var post = {};
    for(var c in this.state.posts){
      if(this.state.posts[c].id === item){
        post = this.state.posts[c];
        break;
      }
    }

    <Redirect to={{
      pathname: '/post',
      search: '',
      state: { post: post }
    }}/>
  }


  render(){
    let posts = this.state.posts.map((item, i) =>
      {return <div key={i} id={i} onClick={(id) => this.renderPost(item.id)} >
          <Post title={item.title}
          author={item.author}
          publish_date={item.publish_date}
          description={item.description}
          slug={item.slug}
          content={item.content}/></div>
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
