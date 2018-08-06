'use strict';

const e = React.createElement;

const MAX_FILE_SIZE = 1000000;

function saveImage(imageFile) {
  return Promise.resolve("http://lorempixel.com/800/100/cats/");
}

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      file: '',
      imagePreviewUrl: '',
      width: '',
      height: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleCropChange = this.handleCropChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    
    if (file.size > MAX_FILE_SIZE) {
      alert(`File size limit is 1mb. This file is ${file.size / 1000000} mbs.`)
      // clear input
      e.target.value = null;
    } else {
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  }

  handlePreview(e) {
    e.preventDefault();
    let preview = window.open(this.state.imagePreviewUrl);
    preview.document.open();
    preview.document.write('<html><head><title>Print Preview</title></head>');
    preview.document.write('<body onafterprint="self.close()">');
    preview.document.write(`<img src="${this.state.imagePreviewUrl}" style="max-width: 800px; max-height: 100px; display: block; margin-left: auto; margin-right: auto; width: 50%;" />`)
    preview.document.write('</body></html>');
    preview.document.close();
    
    preview.onload = () => {
      preview.focus();
      preview.print();
    }
  }

  handleCropChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleClear(e) {
    e.preventDefault();
    // clear input
    document.getElementById('file-input').value = null;
    this.setState({
      file: '',
      imagePreviewUrl: ''
    });
  }

  handleSubmit() {
    var warnMessage = '';
    if (this.state.width > 800) {
      this.setState({ width: 800 });
      warnMessage += 'Max width is 800. Auto set width to 800.';
    }
    if (this.state.height > 100) {
      this.setState({ height: 100 });
      warnMessage += 'Max height is 100. Auto set height to 100.';
    }
    if (warnMessage.length > 0) alert(warnMessage);
    var imageFile = {
      file: this.state.file,
      width: this.state.width,
      height: this.state.height
    };
    saveImage(imageFile);
  }

  render() { 

    return React.createElement(
      'form',
      { onSubmit: this.handleSubmit },
      React.createElement(
        'input',
        {type: 'file', id: 'file-input', accept: 'image/*', onChange: this.handleChange }),
      React.createElement(
          'label',
          { htmlFor: 'width' },
          'Width (max 800)'
        ),
      React.createElement(
          'input',
          { type: 'text', name: 'width', onChange: this.handleCropChange }
        ),
      React.createElement(
          'label',
          { htmlFor: 'height' },
          'Width (max 100)'
        ),
      React.createElement(
          'input',
          { type: 'text', name: 'height', onChange: this.handleCropChange }
        ),
      React.createElement(
          'button',
          { type: 'submit', disabled: !this.state.file, onClick: this.handleClear },
          'clear'),
      React.createElement(
        'button',
        { type: 'submit', disabled: !this.state.file, onClick: this.handlePreview },
        'Print Preview'),
      React.createElement(
        'button',
        { type: 'submit', onClick: this.handleSubmit },
        'Upload'),
    );
  }
}

const domContainer = document.querySelector('#image_upload_container');
ReactDOM.render(e(ImageUpload), domContainer);