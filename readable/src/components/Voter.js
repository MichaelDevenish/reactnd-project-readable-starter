import React, { Component } from 'react'
import classNames from 'classnames'
import '../App.css'
import PropTypes from 'prop-types'

export default class Voter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      votedUp: false,
      votedDown: false
    }
  }

  voteDown () {
    this.setState({ votedUp: false, votedDown: true })
    this.props.onVoteDown()
  }

  voteUp () {
    this.setState({ votedUp: true, votedDown: false })
    this.props.onVoteUp()
  }

  render () {
    const {
      voteScore
    } = this.props

    return (
      <div className='Voter'>
        <button
          className={classNames('upvote', {votedUp: this.state.votedUp})}
          onClick={() => { this.voteUp() }}
        />
        <p>{voteScore}</p>
        <button
          className={classNames('downvote', {votedDown: this.state.votedDown})}
          onClick={() => { this.voteDown() }}
        />
      </div>
    )
  }
}

Voter.propTypes = {
  onVoteUp: PropTypes.func.isRequired,
  onVoteDown: PropTypes.func.isRequired,
  voteScore: PropTypes.number.isRequired
}
