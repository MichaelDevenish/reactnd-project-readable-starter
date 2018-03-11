import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostListPage from './PostListPage';

class MainPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  render () {
    const {
      posts,
      categories
    } = this.props;

    return (
      <PostListPage
        posts={posts}
        categories={categories}
        fromDashboard
      />
    );
  }
}

function mapStateToProps ({comments, posts, categories}) {
  return {
    posts: posts,
    categories: categories
  }
}

export default connect(mapStateToProps)(MainPage);
