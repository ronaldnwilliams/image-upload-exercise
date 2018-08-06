'use strict';

const e = React.createElement;

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log(e.target.files[0]);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
  }

  render() {
    return React.createElement(
      'form',
      { onSubmit: this.handleSubmit },
      React.createElement(
        'input',
        {type: 'file', accept: 'image/*', onChange: this.handleChange }),
      React.createElement(
        'button',
        { type: 'submit', onClick: this.handleSubmit },
        'Print Preview'),
    );
  }
}

const domContainer = document.querySelector('#image_upload_container');
ReactDOM.render(e(ImageUpload), domContainer);