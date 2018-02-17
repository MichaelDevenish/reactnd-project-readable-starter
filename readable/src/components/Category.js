import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import Voter from './Voter'
import { addPost, upvotePostAsync, downvotePostAsync } from '../actions/post'
import PostList from './PostList'

class Category extends Component {
  componentDidMount () {
    axios.get(`http://127.0.0.1:3001/${this.props.match.params.name}/posts`,
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      resp.data.forEach(element => {
        this.props.addPost(element)
      })
    })
  }

  render () {
    const {
        match: {
          params: {
            name
          }
        },
        posts,
        upvotePost,
        downvotePost
    } = this.props

    return (
      <div className='Main'>
        <h1>{name}</h1>
        <PostList
          posts={posts}
          upvotePost={upvotePost}
          downvotePost={downvotePost}
        />
        <Link to={`/`}>
          <p>Back</p>
        </Link>
      </div>
    )
  }
}

Category.propTypes = {
  posts: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    })
  ).isRequired
}

function mapStateToProps ({comments, posts, categories}, ownProps) {
  return {
    posts: Object
    .keys(posts)
    .reduce((relatedPosts, post) => {
      relatedPosts[post] = posts[post].category === ownProps.match.params.name
        ? posts[post]
        : null
      if (relatedPosts[post] === null) {
        delete relatedPosts[post]
      }
      return relatedPosts
    }, {})
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    upvotePost: (data) => dispatch(upvotePostAsync(data)),
    downvotePost: (data) => dispatch(downvotePostAsync(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category))
