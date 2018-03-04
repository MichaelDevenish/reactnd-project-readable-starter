import React, { Component } from 'react'
import moment from 'moment'

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
