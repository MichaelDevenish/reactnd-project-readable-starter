import React, { Component } from 'react';
import Modal from 'react-modal';

export default class CreatePostModal extends Component {
  constructor (props) {
    super(props);

    const category = this.props.staticCategory || 'none';

    this.state = {
      category: category,
      title: '',
      author: '',
      body: '',
      modalOpen: this.props.isOpen
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps (newProps) {
    this.setState({modalOpen: newProps.isOpen});
  }

  get submitDisabled () {
    const {
      author,
      body
    } = this.state;

    return author === '' || body === '';
  }

  generateSelect () {
    const {
      categories
    } = this.props;

    let options = [<option value="none" key="Please Select a Category" disabled>Please Select a Category</option>];

    options = options.concat(Object.keys(categories).map((category) => {
      return (
        <option
          value={categories[category].path}
          key={categories[category].path}
        >
          {categories[category].name}
        </option>);
    }));
    return options;
  }

  handleTitleChange (event) {
    this.setState({title: event.target.value});
  }

  handleAuthorChange (event) {
    this.setState({author: event.target.value});
  }

  handleBodyChange (event) {
    this.setState({body: event.target.value});
  }

  handleFormSubmit (event) {
    const {
      author,
      body
    } = this.state;

    event.preventDefault()
    if (!this.submitDisabled) {
      this.setState({modalOpen: false});
      this.props.onFormSubmit({
        parentId: this.props.parentId,
        category: this.props.category,
        body,
        author
      });
    }
  }

  closeModal () {
    this.setState({modalOpen: false});
    this.props.closeModal();
  }

  render () {
    return (
      <Modal
        className="modal"
        overlayClassName="overlay"
        isOpen={this.state.modalOpen}
        onRequestClose={() => { this.setState({CreateModalOpen: false}) }}
        contentLabel="Modal"
      >
        <button className="exit-modal" onClick={this.closeModal} />
        <h1>Create New Comment</h1>
        <form onSubmit={(event) => { this.handleFormSubmit(event) }}>
          <h3>Author</h3>
          <input
            type="text"
            value={this.state.author}
            onChange={this.handleAuthorChange}
          />
          <h3>Body</h3>
          <textarea
            value={this.state.body}
            onChange={this.handleBodyChange}
          />
          <input
            type="submit"
            value="Submit"
            className="submit"
            disabled={this.submitDisabled}
          />
        </form>
      </Modal>
    );
  }
}

Modal.setAppElement('#root')
