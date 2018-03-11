import React, { Component } from 'react';
import moment from 'moment';

export default class PostItem extends Component {
  get postDate () {
    const {
      details
  } = this.props;

    return moment(details.timestamp).format('MMMM Do YYYY, h:mm:ss a');
  }


  render () {
    const {
        details
    } = this.props;

    return (
      <div className="comment">
        <p>{details.body}</p>
        <p>By {details.author} on {this.postDate}</p>
      </div>
    );
  }
}
