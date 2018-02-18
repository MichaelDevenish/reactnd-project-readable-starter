import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import '../App.css'

export default class PostItem extends Component {
  render () {
    const {
        details
    } = this.props

    return (
      <div className='comment'>
        <p>{details.body}</p>
        <p>By {details.author} on {moment(details.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</p>
      </div>
    )
  }
}

PostItem.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired
  })
}
