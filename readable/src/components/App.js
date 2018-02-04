import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { createCategory } from '../actions/categories'
import { Route, withRouter } from 'react-router-dom'
import axios from 'axios'
import MainPage from './MainPage'
import Category from './Category'
import Post from './Post'

class App extends Component {
  componentDidMount () {
    axios.get('http://127.0.0.1:3001/categories',
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      resp.data.categories.forEach(element => {
        this.props.addCategory(element)
      })
    })
  }

  render () {
    return (
      <div className='App'>
        <Route exact path='/' component={MainPage} />
        <Route path='/category/:name' component={Category} />
        <Route path='/post/:name' component={Post} />
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
    addCategory: (data) => dispatch(createCategory(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
