import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class MainPage extends Component {
  renderCategories (categories) {
    const categoryNames = Object.keys(categories)
    if (categoryNames.length > 0) {
      return categoryNames.map((category) => {
        return (
          <Link to={`/category/${categories[category].category}`} key={categories[category].category}>
            <p>{categories[category].category}</p>
          </Link>
        )
      })
    }
  }

  render () {
    return (
        <div className='Main'>
          {this.renderCategories(this.props.categories)}
        </div>

    )
  }
}

function mapStateToProps ({comments, posts, categories}) {
  return {
    categories: Object
    .keys(categories)
    .map((category) => ({
      category,
      path: categories[category].path,
      posts: Object
        .keys(posts)
        .reduce((relatedPosts, post) => {
          relatedPosts[post] = posts[post].category === category
            ? posts[post]
            : null
          if (relatedPosts[post] === null) {
            delete relatedPosts[post]
          }
          return relatedPosts
        }, {})
    }))
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage))
