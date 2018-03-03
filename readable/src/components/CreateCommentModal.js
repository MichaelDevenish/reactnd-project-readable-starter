import React, { Component } from 'react'
import '../App.css'
import PropTypes from 'prop-types'

export default class CreatePostModal extends Component {
  constructor (props) {
    super(props)

    const category = this.props.staticCategory
      ? this.props.staticCategory
      : 'none'

    this.state = {
      category: category,
      title: '',
      author: '',
      body: ''
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  get submitDisabled () {
    const {
      author,
      body
    } = this.state

    return author === '' || body === ''
  }

  generateSelect () {
    const {
      categories
    } = this.props

    let options = [<option value='none' key='Please Select a Category' disabled>Please Select a Category</option>]

    options = options.concat(Object.keys(categories).map((category) => {
      return (
        <option
          value={categories[category].path}
          key={categories[category].path}
        >
          {categories[category].name}
        </option>)
    }))
    return options
  }

  handleTitleChange (event) {
    this.setState({title: event.target.value})
  }

  handleAuthorChange (event) {
    this.setState({author: event.target.value})
  }

  handleBodyChange (event) {
    this.setState({body: event.target.value})
  }

  handleFormSubmit (event) {
    const {
      author,
      body
    } = this.state

    event.preventDefault()
    if (!this.submitDisabled) {
      this.setState({modalOpen: false})
      this.props.onFormSubmit({
        parentId: this.props.parentId,
        category: this.props.category,
        body,
        author
      })
    }
  }

  render () {
    return (
      <div>
        <button className='exit-modal' onClick={() => { this.setState({modalOpen: false}); this.props.closeModal() }} />
        <h1>Create New Comment</h1>
        <form onSubmit={(event) => { this.handleFormSubmit(event) }}>

          <h3>Author</h3>
          <input type='text' value={this.state.author} onChange={this.handleAuthorChange} />
          <h3>Body</h3>
          <textarea value={this.state.body} onChange={this.handleBodyChange} />

          <input type='submit' value='Submit' className='submit' disabled={this.submitDisabled} />
        </form>
      </div>
    )
  }
}

CreatePostModal.propTypes = {
  parentId: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  staticCategory: PropTypes.string,
  closeModal: PropTypes.func.isRequired
}
