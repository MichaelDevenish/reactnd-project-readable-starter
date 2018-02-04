import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { addComment } from '../actions/comment'
import { addPost } from '../actions/post'
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
          <p key={commentId}>{comments[commentId].body}</p>
        )
      })
    }
  }

  render () {
    const {
      comments,
      post,
      location: {
        state: {
          fromDashboard
        }
      }
    } = this.props
    return (
      <div className='Main'>
        <h1>{post.title}</h1>
        {this.renderComments(comments)}
        <Link to={fromDashboard ? `/` : `/category/${post.category}`}>
          <p>Back</p>
        </Link>
      </div>
    )
  }
}

Category.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  comments: PropTypes.objectOf(
    PropTypes.shape({
      body: PropTypes.string.isRequired
    })
  ).isRequired
}

Category.defaultProps = {
  post: PropTypes.shape({
    title: ''
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
    addPost: (data) => dispatch(addPost(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category))
