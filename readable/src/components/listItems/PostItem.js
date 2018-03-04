import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default class PostItem extends Component {
  render () {
    const {
        details,
        fromDashboard
    } = this.props
    return (
      <Link
        to={{
          pathname: `/${details.category}/${details.id}`,
          state: { fromDashboard: fromDashboard }
        }}
        className='post-item'
      >
        <p>{details.title}</p>
        <p>By {details.author} on {moment(details.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</p>
        <p>Comment count: {details.commentCount} </p>
      </Link>
    )
  }
}
