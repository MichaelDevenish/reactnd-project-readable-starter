import axios from 'axios'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Voter from './smalls/Voter'
import DetailList from './DetailList'
import EditModal from './modals/EditModal'
import CreateCommentModal from './modals/CreateCommentModal'
import {
  addComment,
  upvoteCommentAsync,
  downvoteCommentAsync,
  deleteCommentAsync,
  editCommentAsync,
  createCommentAsync
} from '../actions/comment'
import {
  addPost,
  upvotePostAsync,
  downvotePostAsync,
  editPostAsync
} from '../actions/post'

class Category extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
      CreateModalOpen: false
    }
  }

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

  render () {
    const {
      comments,
      post,
      location: {
        state
      },
      upvotePost,
      downvotePost,
      upvoteComment,
      downvoteComment,
      createComment
    } = this.props

    return (
      <div className='post-page'>
        <div className='post-header'>
          <Link to={state ? state.fromDashboard ? `/` : `/${post.category}` : '/'} className='back-link'><p /></Link>
          <Voter
            onVoteUp={() => { upvotePost({id: post.id}) }}
            onVoteDown={() => { downvotePost({id: post.id}) }}
            voteScore={post.voteScore}
          />
          <div className='post-details'>
            <h1>{post.title}</h1>
            <button className='icon-button edit-button' onClick={() => { this.setState({modalOpen: true}) }} />
            <p>By {post.author} on {moment(post.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p className='body'>{post.body}</p>
          </div>
        </div>
        <div className='posts'>
          <DetailList
            posts={comments}
            upvotePost={upvoteComment}
            downvotePost={downvoteComment}
            listType='comment'
            deleteItem={(id) => { this.props.deleteComment(id) }}
            editItem={(id) => { this.props.editComment(id) }}
          />
        </div>
        <button className='action-button category-post-create' onClick={() => { this.setState({CreateModalOpen: true}) }} ><span className='create-action' /></button>
        <EditModal
          currentEditedItem={this.props.post}
          isOpen={this.state.modalOpen}
          onFormSubmit={(e) => { this.props.editPost(e); this.setState({modalOpen: false}) }}
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
    )
  }
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
    createComment: (data) => dispatch(createCommentAsync(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category))
