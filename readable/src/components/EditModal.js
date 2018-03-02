import React, { Component } from 'react'
import '../App.css'
import PropTypes from 'prop-types'

export default class EditModal extends Component {
  constructor (props) {
    super(props)

    const {
      currentEditedItem: {
        title,
        body,
        id
      }
    } = props

    this.state = {
      title: title,
      body: body,
      id: id
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  get submitDisabled () {
    const {
      title,
      body
    } = this.state

    return title === '' || body === ''
  }

  generateSelect () {
    const {
      categories
    } = this.props

    let options = [<option value='none' key='Please Select a Category' disabled>Please Select a Category</option>];

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

  handleBodyChange (event) {
    this.setState({body: event.target.value})
  }

  handleFormSubmit (event) {
    const {
      title,
      body,
      id
    } = this.state

    event.preventDefault()
    if (!this.submitDisabled) {
      this.setState({modalOpen: false})
      this.props.onFormSubmit({
        title,
        body,
        id
      })
    }
  }

  render () {
    return (
      <div>
        <button className='exit-modal' onClick={() => { this.setState({modalOpen: false}); this.props.closeModal() }} />
        <h1>Edit</h1>
        <form onSubmit={(event) => { this.handleFormSubmit(event) }}>

          <h3>Title</h3>
          <input type='text' value={this.state.title} onChange={this.handleTitleChange} />
          <h3>Body</h3>
          <textarea value={this.state.body} onChange={this.handleBodyChange} />

          <input type='submit' value='Submit' className='submit' disabled={this.submitDisabled} />
        </form>
      </div>
    )
  }
}

EditModal.propTypes = {
  currentEditedItem: PropTypes.object,
  onFormSubmit: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
}
