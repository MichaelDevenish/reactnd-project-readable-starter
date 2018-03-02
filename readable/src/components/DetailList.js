import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import '../App.css'
import Voter from './Voter'
import PostItem from './PostItem'
import CommentItem from './CommentItem'
import Modal from 'react-modal'
import EditModal from './EditModal'

export default class DetailList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sortType: 'index',
      currentEditedItem: {},
      modalOpen: false
    }
  }

  itemDetails (details) {
    switch (this.props.listType) {
      case 'post':
        return <PostItem details={details} fromDashboard={this.props.fromDashboard} />
      case 'comment':
        return <CommentItem details={details} />
      default:
        break
    }
  }

  renderPosts (posts) {
    console.log(posts)
    switch (this.state.sortType) {
      case 'score':
        posts = _.orderBy(posts, ['voteScore'], ['desc'])
        break
      case 'date':
        posts = _.orderBy(posts, ['timestamp'], ['desc'])
        break
      default:
        break
    }
    const postIds = Object.keys(posts)
    if (postIds.length > 0) {
      return postIds.map((postId, index) => {
        console.log(posts[postId])
        if (posts[postId] !== undefined && posts[postId] !== null) {
          const even = index % 2 === 0
          return (
            <div className={classNames('post', {evenPost: even, oddPost: !even})} key={postId}>
              <Voter
                onVoteUp={() => { this.props.upvotePost({ id: posts[postId].id }) }}
                onVoteDown={() => { this.props.downvotePost({ id: posts[postId].id }) }}
                voteScore={posts[postId].voteScore}
              />
              <div className='postDetails'>
                {this.itemDetails(posts[postId])}
              </div>
              {this.props.editItem && <button className='edit' onClick={() => { this.setState({modalOpen: true, currentEditedItem: posts[postId]}) }} />}
              {this.props.deleteItem && <button className='delete' onClick={() => { this.props.deleteItem({id: posts[postId].id}) }} />}
            </div>
          )
        }
      })
    }
  }

  get title () {
    const {
      title,
      titleBack
    } = this.props
    var back = null
    if (titleBack) {
      back = <Link to={titleBack} className='back-link'><p /></Link>
    }
    if (title) {
      return <div>{back}<h2>{title}</h2></div>
    } else {
      return null
    }
  }

  get sortText () {
    return (
      <div className='sort-text' >
        <p>Sort By: </p>
        <p
          className={classNames(
            {
              clicked: this.state.sortType === 'index',
              interactable: this.state.sortType !== 'index'
            }
          )}
          onClick={() => { this.setState({sortType: 'index'}) }}
        > Index </p>
        <p>|</p>
        <p
          className={classNames(
            {
              clicked: this.state.sortType === 'score',
              interactable: this.state.sortType !== 'score'
            }
          )}
          onClick={() => { this.setState({sortType: 'score'}) }}
        > Score </p>
        <p>|</p>
        <p
          className={classNames(
            {
              clicked: this.state.sortType === 'date',
              interactable: this.state.sortType !== 'date'
            }
          )}
          onClick={() => { this.setState({sortType: 'date'}) }}
        > Date </p>
      </div>
    )
  }

  render () {
    return (
      <div className='post-list'>
        <div className='post-list-header'>
          {this.title}
          {this.sortText}
        </div>
        <div className='list-of-posts'>
          {this.renderPosts(this.props.posts)}
        </div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.modalOpen}
          onRequestClose={() => { this.setState({modalOpen: false}) }}
          contentLabel='Modal'
        >
          <EditModal
            currentEditedItem={this.state.currentEditedItem}
            onFormSubmit={(e) => { this.props.editItem(e); this.setState({modalOpen: false}) }}
            closeModal={() => { this.setState({modalOpen: false}) }}
          />
        </Modal>
      </div>
    )
  }
}

DetailList.propTypes = {
  posts: PropTypes.shape(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired
    })
  ),
  upvotePost: PropTypes.func.isRequired,
  downvotePost: PropTypes.func.isRequired,
  fromDashboard: PropTypes.bool.isRequired,
  title: PropTypes.string,
  listType: PropTypes.string.isRequired,
  deleteItem: PropTypes.func,
  editItem: PropTypes.func
}

DetailList.defaultProps = {
  fromDashboard: false
}
