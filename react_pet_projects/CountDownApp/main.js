var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainContainer = function (_React$Component) {
  _inherits(MainContainer, _React$Component);

  function MainContainer(props) {
    _classCallCheck(this, MainContainer);

    var _this = _possibleConstructorReturn(this, (MainContainer.__proto__ || Object.getPrototypeOf(MainContainer)).call(this, props));

    _this.handleChangeDate = function (value) {
      if (new Date(Date.parse(value)) < new Date()) {
        _this.setState({
          showErrMessage: true
        });
        setTimeout(function () {
          return _this.setState({ showErrMessage: false });
        }, 2000);
        return false;
      } else {
        _this.setState({
          date: new Date(Date.parse(value))
        });
      }
      console.log('changing time to ' + value);
    };

    _this.handleUnmount = function () {
      if (_this.state.date < new Date()) {
        _this.setState({
          showErrMessage: true
        });
        setTimeout(function () {
          return _this.setState({ showErrMessage: false });
        }, 2000);
      } else {
        _this.setState({
          renderInput: false
        });
      }
    };

    _this.handleUpdateEvent = function (eventText) {
      _this.setState({
        event: eventText
      });
    };

    _this.state = {
      date: new Date(),
      renderInput: true,
      event: "your event",
      showErrMessage: false
    };
    return _this;
  }

  _createClass(MainContainer, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "mainContainer" },
        this.state.renderInput ? React.createElement(InputField, {
          handleChangeDate: this.handleChangeDate,
          date: this.state.date,
          handleUnmount: this.handleUnmount,
          showErrMessage: this.state.showErrMessage,
          handleUpdateEvent: this.handleUpdateEvent }) : React.createElement(Countdown, {
          targetDate: this.state.date,
          event: this.state.event })
      );
    }
  }]);

  return MainContainer;
}(React.Component);

var InputField = function (_React$Component2) {
  _inherits(InputField, _React$Component2);

  function InputField(props) {
    _classCallCheck(this, InputField);

    var _this2 = _possibleConstructorReturn(this, (InputField.__proto__ || Object.getPrototypeOf(InputField)).call(this, props));

    _this2.handleChange = function (e) {
      _this2.props.handleChangeDate(e.target.value);
    };

    _this2.handleTittleChange = function (e) {
      _this2.props.handleUpdateEvent(e.target.value);
    };

    _this2.handleClick = _this2.handleClick.bind(_this2);
    return _this2;
  }

  _createClass(InputField, [{
    key: "handleClick",
    value: function handleClick() {
      this.props.handleUnmount();
    }
  }, {
    key: "render",
    value: function render() {
      function formatDate(date) {
        return date.getFullYear() + '-' + ('0' + (+date.getMonth() + 1)).slice(-2) + '-' + ('0' + +date.getDate()).slice(-2) + 'T' + date.toLocaleTimeString();
      }
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "caption" },
          "When ",
          React.createElement(
            "span",
            { className: "event-name" },
            React.createElement("input", { type: "text", placeholder: "your event name", onChange: this.handleTittleChange })
          ),
          "must happent? ",
          React.createElement("br", null),
          " "
        ),
        this.props.showErrMessage ? React.createElement(ErrMessage, null) : null,
        React.createElement(
          "div",
          null,
          React.createElement("input", {
            type: "datetime-local",
            step: "1",
            value: formatDate(this.props.date),
            onChange: this.handleChange,
            className: "datepicker"
          })
        ),
        React.createElement(
          "button",
          { onClick: this.handleClick },
          " Show me how long to wait! "
        )
      );
    }
  }]);

  return InputField;
}(React.Component);

function ErrMessage() {
  return React.createElement(
    "div",
    { className: "error" },
    " You need to pick date and time in the future"
  );
}

var Countdown = function (_React$Component3) {
  _inherits(Countdown, _React$Component3);

  function Countdown(props) {
    _classCallCheck(this, Countdown);

    var _this3 = _possibleConstructorReturn(this, (Countdown.__proto__ || Object.getPrototypeOf(Countdown)).call(this, props));

    _this3.state = {
      difference: (_this3.props.targetDate - new Date()) / 1000,
      showCongrats: false
    };
    return _this3;
  }

  _createClass(Countdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      var timerInterval = setInterval(function () {
        if ((_this4.props.targetDate - new Date()) / 1000 < 0) {
          clearInterval(timerInterval);
          _this4.setState({
            showCongrats: true
          });
        } else {
          _this4.setState({
            difference: (_this4.props.targetDate - new Date()) / 1000
          });
        }
      }, 1000);
    }
  }, {
    key: "render",
    value: function render() {
      var diff = this.state.difference;
      var seconds = parseInt(diff % 60);
      var minutes = parseInt(diff / 60 % 60);
      var hours = parseInt(diff / 60 / 60 % 24);
      var days = parseInt(diff / 24 / 60 / 60);
      return React.createElement(
        "span",
        { className: "tittle-countdown" },
        "Countdown to: ",
        this.props.event,
        React.createElement(
          "table",
          null,
          React.createElement(
            "tbody",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                null,
                days
              ),
              React.createElement(
                "th",
                null,
                hours
              ),
              React.createElement(
                "th",
                null,
                minutes
              ),
              React.createElement(
                "th",
                null,
                seconds
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "Days"
              ),
              React.createElement(
                "td",
                null,
                "Hours"
              ),
              React.createElement(
                "td",
                null,
                "Minutes"
              ),
              React.createElement(
                "td",
                null,
                "Seconds"
              )
            )
          )
        ),
        this.state.showCongrats ? React.createElement(
          "div",
          { className: "congrats" },
          " CONGRATUATION! "
        ) : null
      );
    }
  }]);

  return Countdown;
}(React.Component);

ReactDOM.render(React.createElement(MainContainer, null), document.getElementById("root"));
