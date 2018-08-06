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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      fileSelected: true,
      file: e.target.files[0]
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
  }

  render() {
    let previewButton = this.state.fileSelected ? 
      React.createElement('button',
      { type: 'submit', onClick: this.handleSubmit },
      'Print Preview') : 
      React.createElement('p', {}, 'Select an image to uplaod');

    return React.createElement(
      'form',
      { onSubmit: this.handleSubmit },
      React.createElement(
        'input',
        {type: 'file', accept: 'image/*', onChange: this.handleChange }),
      previewButton,
    );
  }
}

const domContainer = document.querySelector('#image_upload_container');
ReactDOM.render(e(ImageUpload), domContainer);