import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PostListPage from './PostListPage';
import {
  addPost
} from '../actions/post';

class Category extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modalOpen: false
    }
  }

  componentDidMount () {
    axios.get(`http://127.0.0.1:3001/${this.props.match.params.name}/posts`,
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      resp.data.forEach(element => {
        this.props.addPost(element);
      });
    });
  }

  render () {
    const {
        match: {
          params: {
            name
          }
        },
        posts,
        categories
    } = this.props;

    return (
      <PostListPage
        posts={posts}
        categories={categories}
        staticCategory={name}
        titleBack="/"
        showReturnHome
      />
    );
  }
}

function mapStateToProps ({comments, posts, categories}, ownProps) {
  return {
    posts: Object
    .keys(posts)
    .reduce((relatedPosts, post) => {
      if (posts[post] !== null) {
        relatedPosts[post] = posts[post].category === ownProps.match.params.name
          ? posts[post]
          : null;
      };
      if (relatedPosts[post] === null) {
        delete relatedPosts[post];
      };
      return relatedPosts;
    }, {}),
    categories: categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
