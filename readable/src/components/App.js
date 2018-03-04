import axios from 'axios'
import Post from './Post'
import { connect } from 'react-redux'
import MainPage from './MainPage'
import Category from './Category'
import React, { Component } from 'react'
import { addPost } from '../actions/post'
import { createCategory } from '../actions/categories'
import { Route, withRouter } from 'react-router-dom'

class App extends Component {
  componentDidMount () {
    axios.get('http://127.0.0.1:3001/categories',
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      resp.data.categories.forEach(element => {
        this.props.addCategory(element)
      })
    })

    axios.get(`http://127.0.0.1:3001/posts`,
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      resp.data.forEach(element => {
        this.props.addPost(element)
      })
    })
  }

  render () {
    return (
      <div className='App'>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/:name' component={Category} />
        <Route exact path='/:category/:name' component={Post} />
      </div>
    )
  }
}

function mapStateToProps ({comments, posts, categories}) {
  return {
    categories,
    posts,
    comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addCategory: (data) => dispatch(createCategory(data)),
    addPost: (data) => dispatch(addPost(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
