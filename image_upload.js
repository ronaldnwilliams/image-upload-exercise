'use strict';

const e = React.createElement;

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      fileSelected: false,
      file: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      fileSelected: true,
      file: e.target.files[0]
    })
  }

  handlePreview(e) {
    e.preventDefault();
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
  }

  render() {
    // Create a preview button if user selects a file else helpful text
    let previewButton = this.state.fileSelected ? 
      React.createElement(
        'button',
        { type: 'submit', onClick: this.handlePreview },
        'Print Preview') : 
      React.createElement('p', {}, 'Select an image to uplaod');

    // Create a submit button if user selects a file else nothing
    let submitButton = this.state.fileSelected ? 
      React.createElement(
        'button',
        { type: 'submit', onClick: this.handleSubmit },
        'Upload') : '';

    return React.createElement(
      'form',
      { onSubmit: this.handleSubmit },
      React.createElement(
        'input',
        {type: 'file', accept: 'image/*', onChange: this.handleChange }),
      previewButton,
      submitButton,
    );
  }
}

const domContainer = document.querySelector('#image_upload_container');
ReactDOM.render(e(ImageUpload), domContainer);