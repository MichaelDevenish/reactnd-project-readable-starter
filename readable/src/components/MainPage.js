import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { upvotePostAsync, downvotePostAsync, createPostAsync, deletePostAsync, editPostAsync } from '../actions/post'
import DetailList from './DetailList'
import Modal from 'react-modal'
import CreatePostModal from './CreatePostModal'

class MainPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  renderCategories (categories) {
    const categoryNames = Object.keys(categories)
    if (categoryNames.length > 0) {
      return categoryNames.map((category) => {
        return (
          <div className='category' key={categories[category].path}>
            <Link to={`/${categories[category].path}`}>
              <h3>{categories[category].name}</h3>
            </Link>
          </div>
        )
      })
    }
  }

  render () {
    const {
      posts,
      categories,
      upvotePost,
      downvotePost,
      createPost
    } = this.props

    return (
      <div className='Main'>
        <div className='categories'>
          <h2>Categories</h2>
          {this.renderCategories(categories)}
        </div>
        <DetailList
          posts={posts}
          upvotePost={upvotePost}
          downvotePost={downvotePost}
          title='Posts'
          listType='post'
          deleteItem={(id) => { this.props.deletePost(id) }}
          editItem={(data) => { this.props.editPost(data) }}
          fromDashboard
        />
        <button className='create-post main-post-create' onClick={() => { this.setState({modalOpen: true}) }} ><span /></button>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.modalOpen}
          onRequestClose={() => { this.setState({modalOpen: false}) }}
          contentLabel='Modal'
        >
          <CreatePostModal
            categories={categories}
            onFormSubmit={(e) => { createPost(e); this.setState({modalOpen: false}) }}
            closeModal={() => { this.setState({modalOpen: false}) }}
          />
        </Modal>
      </div>
    )
  }
}

function mapStateToProps ({comments, posts, categories}) {
  return {
    posts: posts,
    categories: categories
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage))
