//USING HOOKS

const { useState } = React;
const { useEffect } = React;

function MainContainer (props){
  const [time, setTime] = useState(0);
  const [timerOn, setisTimerOn] = useState(false);
  const [laps, setLaps] = useState([]);
  handleStart = () => {
    setisTimerOn(true)
  }

  useEffect(() => {
    let timerInterval = null;

    if (timerOn) {
      timerInterval = setInterval(() => {
        setTime(time => time + 10)
      }, 10)
    }else{
      clearInterval(timerInterval)
    }
    return () => clearInterval(timerInterval)
  }, [timerOn]);


  handleLap = () => {
    setLaps(prevLaps => [...prevLaps, formatTime(time)])
  }
  handleStop = () => {
    setisTimerOn(false)
  }
  handleRestart = () => {
    setisTimerOn(false);
    setTime(0);
  }
  handleClear = () => {
    setLaps([])
  }

  return (
    <div className='mainContainer'> <span className='caption'> Stop Watch </span>
    <ButtonsContainer
    handleStart={handleStart}
    handleLap={handleLap}
    handleStop={handleStop}
    handleRestart={handleRestart}
    handleClear={handleClear}
    />
    <Time time={time}/>
    <Laps laps={laps}/>
     </div>
  )
}

function ButtonsContainer(props) {
  return(
    <div className='buttons-container'>
      <Button name='Start' onClick={props.handleStart}/>
      <Button name='Lap' onClick={props.handleLap} />
      <Button name='Stop' onClick={props.handleStop} />
      <Button name='Restart' onClick={props.handleRestart} />
      <Button name='Clear Loop' onClick={props.handleClear} />
    </div>
  )
}

function Button(props) {
  return(
    <button onClick={props.onClick}> {props.name} </button>
  )
}

function Time(props) {
  return (
    <div className='time'> {formatTime(props.time)} </div>
  )
}

function formatTime(time) {
  const minutes = ('0' + parseInt(time / 60 / 100 / 10 % 100)).slice(-2);
  const seconds = ('0' + parseInt(time / 100 / 10 % 60)).slice(-2);
  const miliseconds = ('0' + time / 10 % 100).slice(-2);
  return `${minutes}:${seconds}:${miliseconds}`
}

function Laps(props) {
  return(
    <ol> {props.laps.map(element => <li key={element}> {element}</li> )} </ol>
  )
}

ReactDOM.render(<MainContainer />, document.getElementById("root"));
