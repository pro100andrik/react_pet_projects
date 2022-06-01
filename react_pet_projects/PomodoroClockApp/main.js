var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainContainer = function (_React$Component) {
  _inherits(MainContainer, _React$Component);

  function MainContainer(props) {
    _classCallCheck(this, MainContainer);

    var _this = _possibleConstructorReturn(this, (MainContainer.__proto__ || Object.getPrototypeOf(MainContainer)).call(this, props));

    _this.changeStatus = function () {
      _this.setState({ isActive: !_this.state.isActive });
      if (!_this.state.isActive) {
        _this.timerInterval = setInterval(function () {
          if (_this.state.secondsLeft == 0) {
            if (_this.state.type == 'pomodoro') {
              _this.setState({
                type: 'shortBreak',
                secondsLeft: _this.convertMinutesToSeconds(_this.state.typeTime['shortBreak'])
              });
            } else if (_this.state.type == 'shortBreak') {
              _this.setState({
                type: 'pomodoro',
                secondsLeft: _this.convertMinutesToSeconds(_this.state.typeTime['pomodoro'])
              });
            } else {
              _this.setState({
                type: 'pomodoro',
                secondsLeft: _this.convertMinutesToSeconds(_this.state.typeTime['pomodoro'])
              });
            }
          }
          _this.setState({ secondsLeft: _this.state.secondsLeft - 1 });
        }, 1000);
      } else {
        clearInterval(_this.timerInterval);
        console.log('should stop');
      }
    };

    _this.convertMinutesToSeconds = function (time) {
      return time * 60;
    };

    _this.changetype = function (newType) {
      _this.setState({
        type: newType,
        secondsLeft: _this.convertMinutesToSeconds(_this.state.typeTime[newType])
      });
    };

    _this.changeSettingsState = function () {
      _this.setState({ showSettings: !_this.state.showSettings });
    };

    _this.changeFinalTime = function (newTime, target) {
      _this.setState({
        typeTime: Object.assign({}, _this.state.typeTime, _defineProperty({}, target, newTime))
      });
      if (target == _this.state.type) {
        _this.setState({
          secondsLeft: _this.convertMinutesToSeconds(newTime)
        });
      }
    };

    _this.state = {
      typeTime: { pomodoro: 25, shortBreak: 5, longBreak: 15 },
      type: 'pomodoro',
      isActive: false,
      secondsLeft: 1500,
      showSettings: false
    };
    return _this;
  }

  _createClass(MainContainer, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'mode-buttons' },
          React.createElement(ModeButtons, { changetype: this.changetype, type: this.state.type })
        ),
        React.createElement(
          'div',
          { className: 'mainContainer' },
          React.createElement(TimeAndSettings, { typeTime: this.state.typeTime,
            type: this.state.type,
            secondsLeft: this.state.secondsLeft,
            showSettings: this.state.showSettings,
            changeSettingsState: this.changeSettingsState,
            changeFinalTime: this.changeFinalTime })
        ),
        React.createElement(
          'div',
          { className: 'start-stop-button' },
          React.createElement(StartStopButton, { isActive: this.state.isActive, changeStatus: this.changeStatus }),
          ' '
        )
      );
    }
  }]);

  return MainContainer;
}(React.Component);

var TimeAndSettings = function TimeAndSettings(props) {
  renderTime = function renderTime(time) {
    return ('0' + parseInt(time / 60)).slice(-2) + ':' + ('0' + parseInt(time % 60)).slice(-2);
  };
  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      { className: 'time' },
      renderTime(props.secondsLeft),
      React.createElement(
        'button',
        { className: 'settings-button', onClick: props.changeSettingsState },
        ' \u2699\uFE0F '
      )
    ),
    props.showSettings ? React.createElement(
      'div',
      null,
      React.createElement(SettingsContainer, { typeTime: props.typeTime,
        changeSettingsState: props.changeSettingsState,
        changeFinalTime: props.changeFinalTime })
    ) : null
  );
};

var SettingsContainer = function SettingsContainer(props) {
  changeTime = function changeTime(e) {
    props.changeFinalTime(e.target.value, e.target.id);
  };
  return React.createElement(
    'div',
    { className: 'settings-container' },
    React.createElement(
      'div',
      { className: 'caption' },
      ' Settings: '
    ),
    React.createElement(
      'div',
      { className: 'option' },
      React.createElement(
        'label',
        { htmlFor: 'pomodoro' },
        'Pomodoro time: '
      ),
      React.createElement('input', { id: 'pomodoro', type: 'number', min: '0', name: 'pomodoro', value: props.typeTime.pomodoro, onChange: changeTime })
    ),
    React.createElement(
      'div',
      { className: 'option' },
      React.createElement(
        'label',
        { htmlFor: 'shortBreak' },
        'Short Break time: '
      ),
      React.createElement('input', { id: 'shortBreak', type: 'number', min: '0', name: 'shortBreak', value: props.typeTime.shortBreak, onChange: changeTime })
    ),
    React.createElement(
      'div',
      { className: 'option' },
      React.createElement(
        'label',
        { htmlFor: 'longBreak' },
        'Long Break time: '
      ),
      React.createElement('input', { id: 'longBreak', type: 'number', min: '0', name: 'longBreak', value: props.typeTime.longBreak, onChange: changeTime })
    )
  );
};

var StartStopButton = function StartStopButton(props) {
  return React.createElement(
    'button',
    { onClick: props.changeStatus },
    ' ',
    props.isActive ? 'Pause' : 'Start',
    ' '
  );
};

var ModeButtons = function ModeButtons(props) {

  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: function onClick() {
          return props.changetype('pomodoro');
        }, className: props.type == 'pomodoro' ? 'active' : '' },
      ' Pomodoro '
    ),
    React.createElement(
      'button',
      { onClick: function onClick() {
          return props.changetype('shortBreak');
        }, className: props.type == 'shortBreak' ? 'active' : '' },
      ' Short Break '
    ),
    React.createElement(
      'button',
      { onClick: function onClick() {
          return props.changetype('longBreak');
        }, className: props.type == 'longBreak' ? 'active' : '' },
      ' Long Break '
    )
  );
};

ReactDOM.render(React.createElement(MainContainer, null), document.getElementById("root"));
