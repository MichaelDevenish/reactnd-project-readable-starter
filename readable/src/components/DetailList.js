import _ from 'lodash'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import EditModal from './modals/EditModal'
import DetailItem from './DetailItem'

export default class DetailList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sortType: 'index',
      currentEditedItem: {},
      modalOpen: false
    }
  }

  renderPosts (posts) {
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
        if (posts[postId] !== undefined && posts[postId] !== null) {
          return (
            <DetailItem
              key={postId}
              even={index % 2 === 0}
              item={posts[postId]}
              upvoteItem={() => { this.props.upvotePost({ id: posts[postId].id }) }}
              downvoteItem={() => { this.props.downvotePost({ id: posts[postId].id }) }}
              editAction={() => { this.setState({modalOpen: true, currentEditedItem: posts[postId]}) }}
              deleteAction={() => { this.props.deleteItem({id: posts[postId].id}) }}
              listType={this.props.listType}
              fromDashboard={this.props.fromDashboard}
            />
          )
        }
        return null
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

  generateSortItem (sortName) {
    return <p
      className={classNames(
        {
          clicked: this.state.sortType === sortName,
          interactable: this.state.sortType !== sortName
        }
      )}
      onClick={() => { this.setState({sortType: sortName}) }}
    > {sortName} </p>
  }

  get sortText () {
    return (
      <div className='sort-text' >
        <p>Sort By: </p>
        {this.generateSortItem('index')}
        <p>|</p>
        {this.generateSortItem('score')}
        <p>|</p>
        {this.generateSortItem('date')}
      </div>
    )
  }

  render () {
    return (
      <div className='detail-list'>
        <div className='detail-list-header'>
          {this.title}
          {this.sortText}
        </div>
        <div className='detail-items'>
          {this.renderPosts(this.props.posts)}
        </div>
        <EditModal
          currentEditedItem={this.state.currentEditedItem}
          isOpen={this.state.modalOpen}
          onFormSubmit={(e) => { this.props.editItem(e); this.setState({modalOpen: false}) }}
          closeModal={() => { this.setState({modalOpen: false}) }}
        />
      </div>
    )
  }
}
