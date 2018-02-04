import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { addPost } from '../actions/post'
import PropTypes from 'prop-types'

class Category extends Component {
  componentDidMount () {
    axios.get(`http://127.0.0.1:3001/${this.props.match.params.name}/posts`,
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      console.log(resp)
      resp.data.forEach(element => {
        this.props.addPost(element)
      })
    })
  }

  renderPosts (posts) {
    const postIds = Object.keys(posts)
    if (postIds.length > 0) {
      return postIds.map((postId) => {
        return (
          <Link to={`/post/${postId}`} key={postId}>
            <p>{posts[postId].title}</p>
          </Link>
        )
      })
    }
  }

  render () {
    const {
        match: {
          params: {
            name
          }
        },
        posts
    } = this.props

    return (
      <div className='Main'>
        <h1>{name}</h1>
        {this.renderPosts(posts)}
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
  console.log(this.props)
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
    addPost: (data) => dispatch(addPost(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category))
