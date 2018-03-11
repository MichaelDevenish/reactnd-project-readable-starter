import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Voter from './smalls/Voter';
import DetailList from './DetailList';
import EditModal from './modals/EditModal';
import CreateCommentModal from './modals/CreateCommentModal';
import PostDetails from './smalls/PostDetails';
import {
  addComment,
  upvoteCommentAsync,
  downvoteCommentAsync,
  deleteCommentAsync,
  editCommentAsync,
  createCommentAsync
} from '../actions/comment';
import {
  addPost,
  upvotePostAsync,
  downvotePostAsync,
  editPostAsync,
  deletePostAsync
} from '../actions/post';

class Post extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modalOpen: false,
      CreateModalOpen: false
    }

    this.removePost = this.removePost.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount () {
    axios.get(`http://127.0.0.1:3001/posts/${this.props.match.params.name}/comments`,
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      resp.data.forEach(element => {
        this.props.addComment(element);
      });
    });

    axios.get(`http://127.0.0.1:3001/posts/${this.props.match.params.name}`,
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      this.props.addPost(resp.data);
    });
  }

  get backNavigate () {
    const {
      post,
      location: {
        state
      }
    } = this.props;

    return state ? state.fromDashboard ? `/` : `/${post.category}` : '/';
  }

  removePost () {
    const {
      post,
      deletePost,
      history
    } = this.props;

    history.push(this.backNavigate);
    deletePost({id: post.id});
  }

  submitForm (event) {
    this.props.editPost(event);
    this.setState({modalOpen: false});
  }

  render () {
    const {
      comments,
      post,
      upvotePost,
      downvotePost,
      upvoteComment,
      downvoteComment,
      createComment
    } = this.props

    if (post.id) {
      return (
        <div className="post-page">
          <div className="post-header">
            <Link to={this.backNavigate} className="back-link"><p /></Link>
            <Voter
              onVoteUp={() => { upvotePost({id: post.id}) }}
              onVoteDown={() => { downvotePost({id: post.id}) }}
              voteScore={post.voteScore}
            />
            <PostDetails
              editPost={() => this.setState({modalOpen: true})}
              deletePost={this.removePost}
              post={post}
            />
          </div>
          <div className="posts">
            <DetailList
              posts={comments}
              upvotePost={upvoteComment}
              downvotePost={downvoteComment}
              listType="comment"
              deleteItem={(id) => { this.props.deleteComment(id) }}
              editItem={(id) => { this.props.editComment(id) }}
            />
          </div>
          <button className="action-button category-post-create" onClick={() => { this.setState({CreateModalOpen: true}) }} >
            <span className="create-action" />
          </button>
          <EditModal
            currentEditedItem={this.props.post}
            isOpen={this.state.modalOpen}
            onFormSubmit={this.submitForm}
            closeModal={() => { this.setState({modalOpen: false}) }}
          />
          <CreateCommentModal
            parentId={this.props.post.id}
            category={this.props.post.category}
            isOpen={this.state.CreateModalOpen}
            closeModal={() => { this.setState({CreateModalOpen: false}) }}
            onFormSubmit={(e) => {
              createComment(e)
              this.setState({CreateModalOpen: false})
            }}
          />
        </div>
      );
    } else return <h1 className="not-found"> Sorry the following post could not be found </h1>;
  }
}

Post.defaultProps = {
  post: PropTypes.shape({
    title: '',
    voteScore: 0
  })
}

function mapStateToProps ({comments, posts, categories}, ownProps) {
  return {
    post: posts[ownProps.match.params.name],
    comments: Object
    .keys(comments)
    .reduce((relatedcomments, comment) => {
      if (comments[comment] !== null) {
        relatedcomments[comment] = comments[comment].parentId === ownProps.match.params.name
        ? comments[comment]
        : null
      }
      if (relatedcomments[comment] === null) {
        delete relatedcomments[comment]
      }
      return relatedcomments
    }, {})
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addComment: (data) => dispatch(addComment(data)),
    addPost: (data) => dispatch(addPost(data)),
    upvotePost: (data) => dispatch(upvotePostAsync(data)),
    downvotePost: (data) => dispatch(downvotePostAsync(data)),
    upvoteComment: (data) => dispatch(upvoteCommentAsync(data)),
    downvoteComment: (data) => dispatch(downvoteCommentAsync(data)),
    deleteComment: (data) => dispatch(deleteCommentAsync(data)),
    editComment: (data) => dispatch(editCommentAsync(data)),
    editPost: (data) => dispatch(editPostAsync(data)),
    deletePost: (data) => dispatch(deletePostAsync(data)),
    createComment: (data) => dispatch(createCommentAsync(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
