import React, { Component } from 'react';
import classNames from 'classnames';
import Voter from './smalls/Voter';
import PostItem from './listItems/PostItem';
import CommentItem from './listItems/CommentItem';

export default class DetailItem extends Component {
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

  get editItem () {
    const {
      editAction,
      item
    } = this.props;

    if (editAction) {
      return <button
        className="edit icon-button"
        onClick={() => {
          editAction(item)
        }}
      />
    }
  }

  get deleteItem () {
    const {
      deleteAction,
      item
    } = this.props;

    if (deleteAction) {
      return <button
        className="delete icon-button"
        onClick={() => {
          deleteAction({
            id: item.id
          })
        }}
      />
    }
  }

  render () {
    const {
      upvoteItem,
      downvoteItem,
      even,
      item
    } = this.props;

    return (
      <div className={classNames('detail-item', {evenPost: even, oddPost: !even})} >
        <Voter
          onVoteUp={() => { upvoteItem({ id: item.id }) }}
          onVoteDown={() => { downvoteItem({ id: item.id }) }}
          voteScore={item.voteScore}
        />
        <div className="detail-item-custom-section">
          {this.itemDetails(item)}
        </div>
        {this.editItem}
        {this.deleteItem}
      </div>
    );
  }
}
