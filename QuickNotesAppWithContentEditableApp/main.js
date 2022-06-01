var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainContainer = function (_React$Component) {
  _inherits(MainContainer, _React$Component);

  function MainContainer(props) {
    _classCallCheck(this, MainContainer);

    var _this = _possibleConstructorReturn(this, (MainContainer.__proto__ || Object.getPrototypeOf(MainContainer)).call(this, props));

    _this.handleRemoveNote = function (targetIndex) {
      _this.setState(function (prevState) {
        return {
          notes: prevState.notes.filter(function (element, index) {
            return index != targetIndex;
          })
        };
      });
    };

    _this.handleEditTextValue = function (newText, targetIndex) {
      _this.setState(function (prevState) {
        return {
          notes: prevState.notes.map(function (element, index) {
            if (index == targetIndex) element.text = newText;
            return element;
          })
        };
      });
    };

    _this.handleAddNote = function () {
      _this.setState({
        notes: [].concat(_toConsumableArray(_this.state.notes), [{ text: 'edit me', rotate: Math.floor(Math.random() * 4) }])
      });
    };

    _this.state = {
      notes: _this.props.myNotes
    };
    return _this;
  }

  _createClass(MainContainer, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'main-container' },
        ' ',
        React.createElement(AddButton, { handleAddNote: this.handleAddNote }),
        React.createElement(
          'div',
          { className: 'notes-wrapper' },
          this.state.notes.map(function (element, index) {
            return React.createElement(Note, { text: element.text,
              key: index,
              index: index,
              rotate: element.rotate,
              handleRemoveNote: _this2.handleRemoveNote,
              handleEditNote: _this2.handleEditNote,
              handleEditTextValue: _this2.handleEditTextValue });
          })
        )
      );
    }
  }]);

  return MainContainer;
}(React.Component);

function AddButton(props) {
  return React.createElement(
    'div',
    { className: 'add-button', onClick: props.handleAddNote },
    React.createElement('div', { className: 'line vertical' }),
    React.createElement('div', { className: 'line horisontal' })
  );
}

var Note = function (_React$Component2) {
  _inherits(Note, _React$Component2);

  function Note(props) {
    _classCallCheck(this, Note);

    var _this3 = _possibleConstructorReturn(this, (Note.__proto__ || Object.getPrototypeOf(Note)).call(this, props));

    _this3.handleDeleteClick = function () {
      _this3.props.handleRemoveNote(_this3.props.index);
    };

    _this3.handleChange = function (e) {
      console.log(e.target.textContent);
      _this3.props.handleEditTextValue(e.target.textContent, _this3.props.index);
    };

    _this3.handleKeyDown = function (e) {
      if (e.code == 'Enter') {
        e.target.blur();
      }
    };

    _this3.inputRef = React.createRef();
    return _this3;
  }

  _createClass(Note, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'note rotate' + this.props.rotate },
        React.createElement(
          'span',
          { className: 'note-text',
            contentEditable: 'true',
            suppressContentEditableWarning: true,
            onBlur: this.handleChange,
            onKeyDown: this.handleKeyDown,
            ref: this.inputRef },
          this.props.text
        ),
        React.createElement(
          'div',
          { className: 'delete-button', onClick: this.handleDeleteClick },
          React.createElement('img', { src: './Trash.png' })
        )
      );
    }
  }]);

  return Note;
}(React.Component);

var MYNOTES = [{ text: 'ibuprom 10mg', rotate: Math.floor(Math.random() * 4) }, { text: 'radius = 100mm', rotate: Math.floor(Math.random() * 4) }, { text: "i'm stupid", rotate: Math.floor(Math.random() * 4) }];

ReactDOM.render(React.createElement(MainContainer, { myNotes: MYNOTES }), document.getElementById("root"));
