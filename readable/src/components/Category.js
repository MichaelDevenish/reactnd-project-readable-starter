import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import { addPost, deletePostAsync, upvotePostAsync, downvotePostAsync, createPostAsync } from '../actions/post'
import DetailList from './DetailList'
import Modal from 'react-modal'
import CreatePostModal from './CreatePostModal'

class Category extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

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
        downvotePost,
        createPost
    } = this.props

    return (
      <div className='Category'>
        <DetailList
          posts={posts}
          upvotePost={upvotePost}
          downvotePost={downvotePost}
          title={name}
          titleBack={'/'}
          listType='post'
          deleteItem={(id) => { this.props.deletePost(id) }}
        />
        <button className='create-post category-post-create' onClick={() => { this.setState({modalOpen: true}) }} ><span /></button>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.modalOpen}
          onRequestClose={() => { this.setState({modalOpen: false}) }}
          contentLabel='Modal'
        >
          <CreatePostModal
            staticCategory={name}
            onFormSubmit={(e) => { createPost(e); this.setState({modalOpen: false}) }}
          />
        </Modal>
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
      if (posts[post] !== null) {
        relatedPosts[post] = posts[post].category === ownProps.match.params.name
          ? posts[post]
          : null
      }
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
    downvotePost: (data) => dispatch(downvotePostAsync(data)),
    createPost: (data) => dispatch(createPostAsync(data)),
    deletePost: (data) => dispatch(deletePostAsync(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category))
