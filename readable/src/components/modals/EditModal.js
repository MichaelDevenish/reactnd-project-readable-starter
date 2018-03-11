import React, { Component } from 'react';
import Modal from 'react-modal';

export default class EditModal extends Component {
  constructor (props) {
    super(props);

    const {
      currentEditedItem: {
        title,
        body,
        id
      },
      isOpen
    } = props;

    this.state = {
      title: title,
      body: body,
      id: id,
      modalOpen: isOpen
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps (newProps) {
    if (newProps.currentEditedItem) {
      this.setState({
        title: newProps.currentEditedItem.title,
        body: newProps.currentEditedItem.body,
        id: newProps.currentEditedItem.id
      });
    }
    this.setState({modalOpen: newProps.isOpen});
  }

  get submitDisabled () {
    const {
      title,
      body
    } = this.state;

    return title === '' || body === '';
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

  handleBodyChange (event) {
    this.setState({body: event.target.value});
  }

  handleFormSubmit (event) {
    const {
      title,
      body,
      id
    } = this.state;

    event.preventDefault();
    if (!this.submitDisabled) {
      this.setState({modalOpen: false});
      this.props.onFormSubmit({
        title,
        body,
        id
      });
    }
  }

  closeModal () {
    this.setState({modalOpen: false});
    this.props.closeModal();
  }

  get title () {
    if (this.props.currentEditedItem.title) {
      return <div>
        <h3>Title</h3>
        <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
      </div>
    }
  }

  get body () {
    if (this.props.currentEditedItem.body) {
      return <div>
        <h3>Body</h3>
        <textarea value={this.state.body} onChange={this.handleBodyChange} />
      </div>
    }
  }

  render () {
    return (
      <Modal
        className="modal"
        overlayClassName="overlay"
        isOpen={this.state.modalOpen}
        onRequestClose={() => { this.setState({modalOpen: false}) }}
        contentLabel="Modal"
      >
        <button className="exit-modal" onClick={this.closeModal} />
        <h1>Edit</h1>
        <form onSubmit={(event) => { this.handleFormSubmit(event) }}>
          {this.title}
          {this.body}
          <input type="submit" value="Submit" className="submit" disabled={this.submitDisabled} />
        </form>
      </Modal>
    );
  }
}

Modal.setAppElement('#root');
