import React, { Component } from 'react'
import '../App.css'
import PropTypes from 'prop-types'

export default class Voter extends Component {
  render () {
    const {
      onVoteUp,
      onVoteDown,
      voteScore
    } = this.props

    return (
      <div className='Voter'>
        <button onClick={() => { onVoteUp() }}>upvote</button>
        <p>Score: {voteScore}</p>
        <button onClick={() => { onVoteDown() }}>downvote</button>
      </div>
    )
  }
}

Voter.propTypes = {
  onVoteUp: PropTypes.func.isRequired,
  onVoteDown: PropTypes.func.isRequired,
  voteScore: PropTypes.number.isRequired
}
