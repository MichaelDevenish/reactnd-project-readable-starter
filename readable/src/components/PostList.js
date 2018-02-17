import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import '../App.css'
import Voter from './Voter'
import classNames from 'classnames'

export default class PostList extends Component {
  renderPosts (posts) {
    const postIds = Object.keys(posts)
    if (postIds.length > 0) {
      return postIds.map((postId, index) => {
        const even = index % 2 === 0
        return (
          <div className={classNames('post', {evenPost: even, oddPost: !even})} key={postId}>
            <Voter
              onVoteUp={() => { this.props.upvotePost({ id: postId }) }}
              onVoteDown={() => { this.props.downvotePost({ id: postId }) }}
              voteScore={posts[postId].voteScore}
            />
            <div className='postDetails'>
              <Link to={{
                pathname: `/post/${postId}`,
                state: { fromDashboard: this.props.fromDashboard }
              }}>
                <p>{posts[postId].title}</p>
                <p>{moment(posts[postId].timestamp).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </Link>
            </div>
          </div>
        )
      })
    }
  }

  render () {
    return (
      <div className='Main'>
        {this.renderPosts(this.props.posts)}
      </div>
    )
  }
}

PostList.propTypes = {
  posts: PropTypes.shape(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired
    })
  ),
  upvotePost: PropTypes.func,
  downvotePost: PropTypes.func,
  fromDashboard: PropTypes.bool
}

PostList.defaultProps = {
  fromDashboard: false
}
