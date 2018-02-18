import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { upvotePostAsync, downvotePostAsync } from '../actions/post'
import DetailList from './DetailList'

class MainPage extends Component {
  renderCategories (categories) {
    const categoryNames = Object.keys(categories)
    if (categoryNames.length > 0) {
      return categoryNames.map((category) => {
        return (
          <div className='category' key={categories[category].path}>
            <Link to={`/category/${categories[category].path}`}>
              <h3>{categories[category].name}</h3>
            </Link>
          </div>
        )
      })
    }
  }

  render () {
    const {
      posts,
      categories,
      upvotePost,
      downvotePost
    } = this.props

    return (
      <div className='Main'>
        <div className='categories'>
          <h2>Categories</h2>
          {this.renderCategories(categories)}
        </div>
        <DetailList
          posts={posts}
          upvotePost={upvotePost}
          downvotePost={downvotePost}
          title='Posts'
          listType='post'
          fromDashboard
        />
      </div>
    )
  }
}

function mapStateToProps ({comments, posts, categories}) {
  return {
    posts: posts,
    categories: categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upvotePost: (data) => dispatch(upvotePostAsync(data)),
    downvotePost: (data) => dispatch(downvotePostAsync(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage))
//  categories: Object
// .keys(categories)
// .map((category) => ({
//   category,
//   path: categories[category].path,
//   posts: Object
//     .keys(posts)
//     .reduce((relatedPosts, post) => {
//       relatedPosts[post] = posts[post].category === category
//         ? posts[post]
//         : null
//       if (relatedPosts[post] === null) {
//         delete relatedPosts[post]
//       }
//       return relatedPosts
//     }, {})
// }))