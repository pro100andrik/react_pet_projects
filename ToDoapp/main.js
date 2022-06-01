var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainContainer = function (_React$Component) {
  _inherits(MainContainer, _React$Component);

  function MainContainer() {
    _classCallCheck(this, MainContainer);

    return _possibleConstructorReturn(this, (MainContainer.__proto__ || Object.getPrototypeOf(MainContainer)).apply(this, arguments));
  }

  _createClass(MainContainer, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'mainContainer' },
        React.createElement(Caption, null),
        React.createElement(ListContainer, { taskList: TASKS }),
        React.createElement(Credits, null)
      );
    }
  }]);

  return MainContainer;
}(React.Component);

function Caption() {
  return React.createElement(
    'div',
    { className: 'Caption' },
    'ToDo List'
  );
}

var ListContainer = function (_React$Component2) {
  _inherits(ListContainer, _React$Component2);

  function ListContainer(props) {
    _classCallCheck(this, ListContainer);

    var _this2 = _possibleConstructorReturn(this, (ListContainer.__proto__ || Object.getPrototypeOf(ListContainer)).call(this, props));

    _this2.state = {
      tasks: _this2.props.taskList,
      buttonIsVisible: new Array(_this2.props.taskList.length).fill(false),
      showType: 'showAll',
      showRemoveButton: _this2.props.taskList.map(function (el) {
        return el.isChecked;
      }).includes(true)
    };
    _this2.handleAddItem = _this2.handleAddItem.bind(_this2);
    _this2.handleIsChecked = _this2.handleIsChecked.bind(_this2);
    _this2.handleDeleteItem = _this2.handleDeleteItem.bind(_this2);
    _this2.handleButtonVisibility = _this2.handleButtonVisibility.bind(_this2);
    _this2.handleItemsVisibility = _this2.handleItemsVisibility.bind(_this2);
    _this2.handleRemoveCompleted = _this2.handleRemoveCompleted.bind(_this2);
    return _this2;
  }

  _createClass(ListContainer, [{
    key: 'handleButtonVisibility',
    value: function handleButtonVisibility(index) {
      this.setState(function (prevState) {
        return {
          buttonIsVisible: prevState.buttonIsVisible.map(function (el, i) {
            return i != index ? el : !el;
          })
        };
      });
    }
  }, {
    key: 'handleAddItem',
    value: function handleAddItem(taskName) {
      this.setState({
        tasks: [].concat(_toConsumableArray(this.state.tasks), [{ task: taskName, isChecked: false }]),
        buttonIsVisible: [].concat(_toConsumableArray(this.state.buttonIsVisible), [false])
      });
    }
  }, {
    key: 'handleIsChecked',
    value: function handleIsChecked(target) {
      var _this3 = this;

      this.setState(function (prevState) {
        return {
          tasks: prevState.tasks.map(function (el, index) {
            if (index == target) el.isChecked = !el.isChecked;
            return el;
          }),
          showRemoveButton: _this3.state.tasks.map(function (el) {
            return el.isChecked;
          }).includes(true)
        };
      });
    }
  }, {
    key: 'handleDeleteItem',
    value: function handleDeleteItem(target) {
      this.setState(function (prevState) {
        return {
          tasks: prevState.tasks.filter(function (el, i) {
            return target != i;
          }),
          buttonIsVisible: prevState.buttonIsVisible.filter(function (el, index) {
            return index < prevState.buttonIsVisible.length - 1;
          }),
          showRemoveButton: prevState.tasks.filter(function (el, i) {
            return target != i;
          }).map(function (el) {
            return el.isChecked;
          }).includes(true)
        };
      });
    }
  }, {
    key: 'handleRemoveCompleted',
    value: function handleRemoveCompleted() {
      this.setState(function (prevState) {
        return {
          tasks: prevState.tasks.filter(function (el, i) {
            return !el.isChecked;
          }),
          buttonIsVisible: prevState.buttonIsVisible.filter(function (el, index) {
            return index < prevState.buttonIsVisible.length - 1;
          }),
          showRemoveButton: false
        };
      });
    }
  }, {
    key: 'handleItemsVisibility',
    value: function handleItemsVisibility(type) {
      this.setState({
        showType: type
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'ul',
          null,
          React.createElement(TextArea, { handleAddItem: this.handleAddItem }),
          React.createElement(ListOfItems, {
            taskList: this.state.tasks,
            handleCheck: this.handleIsChecked,
            buttonIsVisible: this.state.buttonIsVisible,
            handleDeleteItem: this.handleDeleteItem,
            handleButtonVisibility: this.handleButtonVisibility,
            showType: this.state.showType
          })
        ),
        React.createElement(Controls, {
          taskList: this.state.tasks,
          handleItemsVisibility: this.handleItemsVisibility,
          handleRemoveCompleted: this.handleRemoveCompleted,
          showRemoveButton: this.state.showRemoveButton
        })
      );
    }
  }]);

  return ListContainer;
}(React.Component);

var TextArea = function (_React$Component3) {
  _inherits(TextArea, _React$Component3);

  function TextArea(props) {
    _classCallCheck(this, TextArea);

    var _this4 = _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props));

    _this4.handleKeyDown = _this4.handleKeyDown.bind(_this4);
    return _this4;
  }

  _createClass(TextArea, [{
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      if (e.code != 'Enter') return;
      if (e.target.value == '') {
        alert('enter something');
        return;
      }
      this.props.handleAddItem(e.target.value);
      e.target.value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'span',
        { className: 'input-span' },
        React.createElement('input', { type: 'text',
          className: 'input-text',
          placeholder: 'Input you task here',
          onKeyDown: this.handleKeyDown })
      );
    }
  }]);

  return TextArea;
}(React.Component);

var ListOfItems = function (_React$Component4) {
  _inherits(ListOfItems, _React$Component4);

  function ListOfItems(props) {
    _classCallCheck(this, ListOfItems);

    var _this5 = _possibleConstructorReturn(this, (ListOfItems.__proto__ || Object.getPrototypeOf(ListOfItems)).call(this, props));

    _this5.handleCheck = _this5.handleCheck.bind(_this5);
    _this5.handleButtonClick = _this5.handleButtonClick.bind(_this5);
    _this5.handleMouseEnter = _this5.handleMouseEnter.bind(_this5);
    _this5.handleMouseLeave = _this5.handleMouseLeave.bind(_this5);
    return _this5;
  }

  _createClass(ListOfItems, [{
    key: 'handleCheck',
    value: function handleCheck(e) {
      this.props.handleCheck(e.target.value);
    }
  }, {
    key: 'handleButtonClick',
    value: function handleButtonClick(index) {
      this.props.handleDeleteItem(index);
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter(index) {
      this.props.handleButtonVisibility(index);
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave(index) {
      this.props.handleButtonVisibility(index);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var filteredTasks = this.props.taskList;
      if (this.props.showType == 'showActive') {
        filteredTasks = this.props.taskList.filter(function (el) {
          return !el.isChecked;
        });
      } else if (this.props.showType == 'showCompleted') [filteredTasks = this.props.taskList.filter(function (el) {
        return el.isChecked;
      })];
      return filteredTasks.map(function (element, index) {
        return React.createElement(
          'li',
          { key: index,
            onMouseEnter: function onMouseEnter() {
              return _this6.handleMouseEnter(index);
            },
            onMouseLeave: function onMouseLeave() {
              return _this6.handleMouseLeave(index);
            } },
          React.createElement('input', { type: 'checkbox',
            value: index,
            checked: element.isChecked,
            onChange: _this6.handleCheck,
            className: 'checkbox' }),
          React.createElement(
            'span',
            { className: element.isChecked ? 'text checked-element' : 'text' },
            element.task
          ),
          React.createElement(
            'button',
            { className: _this6.props.buttonIsVisible[index] ? 'close-button' : 'close-button hiden',
              onClick: function onClick() {
                return _this6.handleButtonClick(index);
              } },
            'X'
          )
        );
      });
    }
  }]);

  return ListOfItems;
}(React.Component);

var Controls = function (_React$Component5) {
  _inherits(Controls, _React$Component5);

  function Controls(props) {
    _classCallCheck(this, Controls);

    var _this7 = _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).call(this, props));

    _this7.handleVisibility = _this7.handleVisibility.bind(_this7);
    _this7.handleRemoveCompleted = _this7.handleRemoveCompleted.bind(_this7);
    return _this7;
  }

  _createClass(Controls, [{
    key: 'countLeftItems',
    value: function countLeftItems(array) {
      var count = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (!item.isChecked) count++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return count;
    }
  }, {
    key: 'handleVisibility',
    value: function handleVisibility(type) {
      this.props.handleItemsVisibility(type);
    }
  }, {
    key: 'handleRemoveCompleted',
    value: function handleRemoveCompleted() {
      this.props.handleRemoveCompleted();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      return React.createElement(
        'div',
        { className: 'controls' },
        React.createElement(
          'span',
          { className: 'items-counter' },
          ' ',
          this.countLeftItems(this.props.taskList),
          ' items left'
        ),
        React.createElement(
          'span',
          { className: 'visibility-buttons' },
          React.createElement(
            'button',
            { onClick: function onClick() {
                return _this8.handleVisibility('showAll');
              } },
            'Show all'
          ),
          React.createElement(
            'button',
            { onClick: function onClick() {
                return _this8.handleVisibility('showActive');
              } },
            'Active'
          ),
          React.createElement(
            'button',
            { onClick: function onClick() {
                return _this8.handleVisibility('showCompleted');
              } },
            'Completed'
          )
        ),
        React.createElement(
          'span',
          { className: 'remove-button' },
          React.createElement(
            'button',
            { onClick: this.handleRemoveCompleted, className: this.props.showRemoveButton ? '' : 'hiden' },
            'Remove Completed'
          )
        )
      );
    }
  }]);

  return Controls;
}(React.Component);

function Credits() {
  return React.createElement(
    'div',
    { className: 'credits' },
    'double click to edit ',
    React.createElement('br', null),
    'created by ',
    React.createElement(
      'span',
      { className: 'autor-name' },
      ' KonAnd '
    ),
    ' ',
    React.createElement('br', null),
    'for Portfolio'
  );
}

/*
FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS
 FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS
  FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS
   FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS
    FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS
     FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS
      FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS FIX SHOW STATUS

*/

var TASKS = [{ task: 'clean home', isChecked: false }, { task: 'go clean myself in the bathroom', isChecked: false }, { task: 'play on guitar', isChecked: true }, { task: 'learn react', isChecked: false }, { task: 'go to store', isChecked: false }];

ReactDOM.render(React.createElement(MainContainer, null), document.getElementById("root"));
