var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//USING HOOKS

var _React = React,
    useState = _React.useState;
var _React2 = React,
    useEffect = _React2.useEffect;


function MainContainer(props) {
  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      time = _useState2[0],
      setTime = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      timerOn = _useState4[0],
      setisTimerOn = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      laps = _useState6[0],
      setLaps = _useState6[1];

  handleStart = function handleStart() {
    setisTimerOn(true);
  };

  useEffect(function () {
    var timerInterval = null;

    if (timerOn) {
      timerInterval = setInterval(function () {
        setTime(function (time) {
          return time + 10;
        });
      }, 10);
    } else {
      clearInterval(timerInterval);
    }
    return function () {
      return clearInterval(timerInterval);
    };
  }, [timerOn]);

  handleLap = function handleLap() {
    setLaps(function (prevLaps) {
      return [].concat(_toConsumableArray(prevLaps), [formatTime(time)]);
    });
  };
  handleStop = function handleStop() {
    setisTimerOn(false);
  };
  handleRestart = function handleRestart() {
    setisTimerOn(false);
    setTime(0);
  };
  handleClear = function handleClear() {
    setLaps([]);
  };

  return React.createElement(
    'div',
    { className: 'mainContainer' },
    ' ',
    React.createElement(
      'span',
      { className: 'caption' },
      ' Stop Watch '
    ),
    React.createElement(ButtonsContainer, {
      handleStart: handleStart,
      handleLap: handleLap,
      handleStop: handleStop,
      handleRestart: handleRestart,
      handleClear: handleClear
    }),
    React.createElement(Time, { time: time }),
    React.createElement(Laps, { laps: laps })
  );
}

function ButtonsContainer(props) {
  return React.createElement(
    'div',
    { className: 'buttons-container' },
    React.createElement(Button, { name: 'Start', onClick: props.handleStart }),
    React.createElement(Button, { name: 'Lap', onClick: props.handleLap }),
    React.createElement(Button, { name: 'Stop', onClick: props.handleStop }),
    React.createElement(Button, { name: 'Restart', onClick: props.handleRestart }),
    React.createElement(Button, { name: 'Clear Loop', onClick: props.handleClear })
  );
}

function Button(props) {
  return React.createElement(
    'button',
    { onClick: props.onClick },
    ' ',
    props.name,
    ' '
  );
}

function Time(props) {
  return React.createElement(
    'div',
    { className: 'time' },
    ' ',
    formatTime(props.time),
    ' '
  );
}

function formatTime(time) {
  var minutes = ('0' + parseInt(time / 60 / 100 / 10 % 100)).slice(-2);
  var seconds = ('0' + parseInt(time / 100 / 10 % 60)).slice(-2);
  var miliseconds = ('0' + time / 10 % 100).slice(-2);
  return minutes + ':' + seconds + ':' + miliseconds;
}

function Laps(props) {
  return React.createElement(
    'ol',
    null,
    ' ',
    props.laps.map(function (element) {
      return React.createElement(
        'li',
        { key: element },
        ' ',
        element
      );
    }),
    ' '
  );
}

ReactDOM.render(React.createElement(MainContainer, null), document.getElementById("root"));
