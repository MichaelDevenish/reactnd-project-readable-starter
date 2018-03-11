import React, { Component } from 'react'
import moment from 'moment'
import pluralize from 'pluralize'

export default class Voter extends Component {
  get postDate () {
    const {
      post
    } = this.props;

    return moment(post.timestamp).format('MMMM Do YYYY, h:mm:ss a');
  }

  get commentCount () {
    const {
      post
    } = this.props;

    return pluralize('comment', post.commentCount, true);
  }

  render () {
    const {
      post,
      deletePost,
      editPost
    } = this.props;

    return (
      <div className="post-details">
        <h1>{post.title}</h1>
        <button className="icon-button edit-button" onClick={editPost} />
        <button className="icon-button delete-button" onClick={deletePost} />
        <p>By {post.author} on {this.postDate} with {this.commentCount}</p>
        <p className="body">{post.body}</p>
      </div>
    );
  }
}
