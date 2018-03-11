import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import DetailList from './DetailList';
import CreatePostModal from './modals/CreatePostModal';
import { connect } from 'react-redux';
import {
  deletePostAsync,
  upvotePostAsync,
  downvotePostAsync,
  createPostAsync,
  editPostAsync
} from '../actions/post';

class PostListPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modalOpen: false
    }

    this.submitForm = this.submitForm.bind(this);
  }

  renderCategories (categories) {
    const categoryNames = Object.keys(categories)
    if (categoryNames.length > 0) {
      return categoryNames.map((category) => {
        return (
          <div className="category" key={categories[category].path}>
            <Link to={`/${categories[category].path}`}>
              <h3>{categories[category].name}</h3>
            </Link>
          </div>
        );
      });
    }
  }

  submitForm (event) {
    this.props.createPost(event);
    this.setState({modalOpen: false});
  }

  render () {
    const {
      posts,
      categories,
      upvotePost,
      downvotePost,
      createPost,
      deletePost,
      editPost,
      titleBack,
      staticCategory,
      fromDashboard
    } = this.props;

    return (
      <div className="Main">
        <div className="categories">
          <h2>Categories</h2>
          {this.renderCategories(categories)}
        </div>
        <DetailList
          posts={posts}
          upvotePost={upvotePost}
          downvotePost={downvotePost}
          titleBack={titleBack}
          title={staticCategory || 'Posts'}
          listType="post"
          deleteItem={(id) => { deletePost(id) }}
          editItem={(data) => { editPost(data) }}
          fromDashboard={fromDashboard}
        />
        <button
          className="action-button main-post-create"
          onClick={() => { this.setState({modalOpen: true}) }}
        >
          <span className="create-action" />
        </button>
        <CreatePostModal
          categories={categories}
          staticCategory={staticCategory}
          isOpen={this.state.modalOpen}
          onFormSubmit={this.submitForm}
          closeModal={() => { this.setState({modalOpen: false}) }}
        />
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upvotePost: (data) => dispatch(upvotePostAsync(data)),
    downvotePost: (data) => dispatch(downvotePostAsync(data)),
    createPost: (data) => dispatch(createPostAsync(data)),
    deletePost: (data) => dispatch(deletePostAsync(data)),
    editPost: (data) => dispatch(editPostAsync(data))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(PostListPage));
