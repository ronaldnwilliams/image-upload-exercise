/**
 * A form that a user can upload an image, preview it, and crop it.
 * max file size is 1mb
 * max width is 800
 * max height is 100
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAX_FILE_SIZE = 1000000;

function saveImage(imageFile) {
  return Promise.resolve("http://lorempixel.com/800/100/cats/");
}

var ImageUploadForm = function (_React$Component) {
  _inherits(ImageUploadForm, _React$Component);

  function ImageUploadForm(props) {
    _classCallCheck(this, ImageUploadForm);

    var _this = _possibleConstructorReturn(this, (ImageUploadForm.__proto__ || Object.getPrototypeOf(ImageUploadForm)).call(this, props));

    _this.state = {
      file: '',
      imagePreviewUrl: '',
      width: '',
      height: ''
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handlePreview = _this.handlePreview.bind(_this);
    _this.handleCropChange = _this.handleCropChange.bind(_this);
    _this.handleClear = _this.handleClear.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(ImageUploadForm, [{
    key: 'handleChange',
    value: function handleChange(e) {
      var _this2 = this;

      e.preventDefault();
      var reader = new FileReader();
      var file = e.target.files[0];

      if (file.size > MAX_FILE_SIZE) {
        alert('File size limit is 1mb. This file is ' + file.size / 1000000 + ' mbs.');
        // clear input
        e.target.value = null;
      } else {
        reader.onloadend = function () {
          _this2.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        };

        reader.readAsDataURL(file);
      }
    }
  }, {
    key: 'handlePreview',
    value: function handlePreview(e) {
      e.preventDefault();
      var preview = window.open(this.state.imagePreviewUrl);
      preview.document.open();
      preview.document.write('<html><head><title>Print Preview</title></head>');
      preview.document.write('<body onafterprint="self.close()">');
      preview.document.write('<img src="' + this.state.imagePreviewUrl + '" style="max-width: 800px; max-height: 100px; display: block; margin-left: auto; margin-right: auto; width: 50%;" />');
      preview.document.write('</body></html>');
      preview.document.close();

      preview.onload = function () {
        preview.focus();
        preview.print();
      };
    }
  }, {
    key: 'handleCropChange',
    value: function handleCropChange(e) {
      var target = e.target;
      var value = target.value;
      var name = target.name;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: 'handleClear',
    value: function handleClear(e) {
      e.preventDefault();
      // clear input
      document.getElementById('file-input').value = null;
      this.setState({
        file: '',
        imagePreviewUrl: ''
      });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit() {
      // before saving file check dimensions. 
      // If needed fix and warn
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
  }, {
    key: 'render',
    value: function render() {
      var cropInputs = React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          null,
          React.createElement(
            'label',
            { htmlFor: 'width' },
            'Width'
          ),
          React.createElement('input', { type: 'text', name: 'width', placeholder: 'max 800', onChange: this.handleCropChange })
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'label',
            { htmlFor: 'height' },
            'Height'
          ),
          React.createElement('input', { type: 'text', name: 'height', placeholder: 'max 100', onChange: this.handleCropChange })
        )
      );
      return React.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        React.createElement('input', {
          type: 'file',
          id: 'file-input',
          accept: 'image/*',
          onChange: this.handleChange }),
        this.state.file ? cropInputs : '',
        React.createElement(
          'button',
          {
            type: 'button',
            disabled: !this.state.file,
            onClick: this.handleClear },
          'clear'
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            disabled: !this.state.file,
            onClick: this.handlePreview },
          'Print Preview'
        ),
        React.createElement(
          'button',
          {
            type: 'submit',
            onClick: this.handleSubmit },
          'Upload'
        )
      );
    }
  }]);

  return ImageUploadForm;
}(React.Component);

var domContainer = document.querySelector('#image_upload_container');
ReactDOM.render(React.createElement(ImageUploadForm, null), domContainer);