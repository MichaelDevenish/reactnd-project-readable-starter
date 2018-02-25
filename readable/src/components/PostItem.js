import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import '../App.css'

export default class PostItem extends Component {
  render () {
    const {
        details,
        fromDashboard
    } = this.props
    return (
      <Link to={{
        pathname: `/${details.category}/${details.id}`,
        state: { fromDashboard: fromDashboard }
      }}>
        <p>{details.title}</p>
        <p>By {details.author} on {moment(details.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</p>
      </Link>
    )
  }
}

PostItem.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired
  })
}
