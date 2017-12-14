import React, { Component } from 'react';
import * as BlogServer from '../BlogServer.js';

export class AddComment extends Component{
  constructor(props){
    super(props);

    this.state = {
      showForm: true,
      author: 'Author',
      comment: 'Comment'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
  }

  componentDidMount() {
  }

  ToggleForm(){
    console.log('this st', this.state)
    if(this.state.showForm){
      this.setState({showForm: false});
    }else{
      this.setState({showForm: true});
    }
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

  BlogServer.PostCommentsByPostID(this.props.postId, comment);
  event.preventDefault();
}

  render(){
        return (
          <div className='add-comment'>
          <button onClick={() => this.ToggleForm()}> Reply {this.state.showForm ? 'show' : 'hide'}</button>

          <div className={this.state.showForm ? 'hidden' : '' + ' add-comment-form'}>
            <span>NEW id:{this.props.id}</span><br/>
            <span>parent:{this.props.parent}</span><br/>
            <span>NEW date:{this.props.date}</span><br/>

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

export default AddComment;
