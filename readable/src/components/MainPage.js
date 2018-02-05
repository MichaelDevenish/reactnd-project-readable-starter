import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { upvotePostAsync, downvotePostAsync } from '../actions/post'
import Voter from './Voter'

class MainPage extends Component {
  renderPosts (posts) {
    const postIds = Object.keys(posts)
    if (postIds.length > 0) {
      return postIds.map((postId) => {
        return (
          <div className='category' key={postId}>
            <Voter
              onVoteUp={() => { this.props.upvotePost({id: postId}) }}
              onVoteDown={() => { this.props.downvotePost({id: postId}) }}
              voteScore={posts[postId].voteScore}
            />
            <Link to={{
              pathname: `/post/${postId}`,
              state: { fromDashboard: false }
            }}>
              <p>{posts[postId].title}</p>
            </Link>
          </div>
        )
      })
    }
  }

  renderCategories (categories) {
    const categoryNames = Object.keys(categories)
    if (categoryNames.length > 0) {
      return categoryNames.map((category) => {
        return (
          <div className='category'>
            <Link to={`/category/${categories[category].category}`} key={categories[category].category}>
              <h2>{categories[category].category}</h2>
            </Link>
            <ul>
              {this.renderPosts(categories[category].posts)}
            </ul>
          </div>
        )
      })
    }
  }

  render () {
    return (
      <div className='Main'>
        {this.renderCategories(this.props.categories)}
      </div>
    )
  }
}

function mapStateToProps ({comments, posts, categories}) {
  return {
    categories: Object
    .keys(categories)
    .map((category) => ({
      category,
      path: categories[category].path,
      posts: Object
        .keys(posts)
        .reduce((relatedPosts, post) => {
          relatedPosts[post] = posts[post].category === category
            ? posts[post]
            : null
          if (relatedPosts[post] === null) {
            delete relatedPosts[post]
          }
          return relatedPosts
        }, {})
    }))
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upvotePost: (data) => dispatch(upvotePostAsync(data)),
    downvotePost: (data) => dispatch(downvotePostAsync(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage))
