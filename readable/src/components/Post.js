import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { addComment, upvoteCommentAsync, downvoteCommentAsync } from '../actions/comment'
import { addPost, upvotePostAsync, downvotePostAsync } from '../actions/post'
import Voter from './Voter'
import PropTypes from 'prop-types'

class Category extends Component {
  componentDidMount () {
    axios.get(`http://127.0.0.1:3001/posts/${this.props.match.params.name}/comments`,
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      resp.data.forEach(element => {
        this.props.addComment(element)
      })
    })

    axios.get(`http://127.0.0.1:3001/posts/${this.props.match.params.name}`,
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      this.props.addPost(resp.data)
    })
  }

  renderComments (comments) {
    const commentIds = Object.keys(comments)
    if (commentIds.length > 0) {
      return commentIds.map((commentId) => {
        return (
          <div className='comment' key={commentId}>
            <Voter
              onVoteUp={() => { this.props.upvoteComment({id: commentId}) }}
              onVoteDown={() => { this.props.downvoteComment({id: commentId}) }}
              voteScore={comments[commentId].voteScore}
            />
            <p>{comments[commentId].body}</p>
          </div>
        )
      })
    }
  }

  render () {
    const {
      comments,
      post,
      location: {
        state
      },
      upvotePost,
      downvotePost
    } = this.props

    return (
      <div className='Main'>
        <Voter
          onVoteUp={() => { upvotePost({id: post.id}) }}
          onVoteDown={() => { downvotePost({id: post.id}) }}
          voteScore={post.voteScore}
        />
        <h1>{post.title}</h1>
        {this.renderComments(comments)}
        <Link to={state ? state.fromDashboard ? `/` : `/category/${post.category}` : '/'}>
          <p>Back</p>
        </Link>
      </div>
    )
  }
}

Category.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired
  }).isRequired,
  comments: PropTypes.objectOf(
    PropTypes.shape({
      body: PropTypes.string.isRequired
    })
  ).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      fromDashboard: PropTypes.bool.isRequired
    })
  }).isRequired
}

Category.defaultProps = {
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
      relatedcomments[comment] = comments[comment].parentId === ownProps.match.params.name
      ? comments[comment]
      : null
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
    downvoteComment: (data) => dispatch(downvoteCommentAsync(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category))
