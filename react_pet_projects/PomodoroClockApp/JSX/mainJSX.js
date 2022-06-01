class MainContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      typeTime:{ pomodoro: 25, shortBreak: 5, longBreak: 15},
      type: 'pomodoro',
      isActive: false,
      secondsLeft: 1500,
      showSettings: false
    })
  }

  changeStatus = () => {
    this.setState ({isActive: !this.state.isActive})
    if (!this.state.isActive) {
      this.timerInterval = setInterval( () => {
        if (this.state.secondsLeft == 0){
          if (this.state.type == 'pomodoro'){
            this.setState({
              type: 'shortBreak',
              secondsLeft: this.convertMinutesToSeconds(this.state.typeTime['shortBreak'])
            })

          }else if(this.state.type == 'shortBreak'){
            this.setState({
              type: 'pomodoro',
              secondsLeft: this.convertMinutesToSeconds(this.state.typeTime['pomodoro'])
            })
          }else{
            this.setState({
              type: 'pomodoro',
              secondsLeft: this.convertMinutesToSeconds(this.state.typeTime['pomodoro'])
            })
          }
        }
        this.setState({ secondsLeft: this.state.secondsLeft - 1});
      } ,1000)
    } else {
      clearInterval(this.timerInterval);
      console.log('should stop')
    }
  }

  convertMinutesToSeconds = time => {
    return time * 60;
  }

  changetype = newType => {
    this.setState ({
      type: newType,
      secondsLeft: this.convertMinutesToSeconds(this.state.typeTime[newType])
    })
  }

  changeSettingsState = () => {
    this.setState({showSettings: !this.state.showSettings})
  }

  changeFinalTime = (newTime, target) => {
     this.setState({
       typeTime: {...this.state.typeTime, [target]:newTime},
     })
     if (target == this.state.type){
       this.setState({
         secondsLeft: this.convertMinutesToSeconds(newTime)
       })
     }
  }

  render() {
    return (
      <div>
      <div className='mode-buttons' >
        <ModeButtons changetype={this.changetype} type={this.state.type}/>
      </div>
      <div className='mainContainer'>
        <TimeAndSettings typeTime={this.state.typeTime}
                         type={this.state.type}
                         secondsLeft={this.state.secondsLeft}
                         showSettings={this.state.showSettings}
                         changeSettingsState={this.changeSettingsState}
                         changeFinalTime={this.changeFinalTime}/>
      </div>
      <div className='start-stop-button'>
        <StartStopButton isActive={this.state.isActive} changeStatus={this.changeStatus} /> </div>
      </div>
    )
  }
}

const TimeAndSettings = props => {
  renderTime = time => {
    return `${('0' + parseInt(time / 60)).slice(-2)}:${('0' + parseInt(time % 60)).slice(-2)}`
  }
    return(
      <div>
        <div className='time'>
          {renderTime(props.secondsLeft)}
          <button className='settings-button' onClick={props.changeSettingsState}> ⚙️ </button>
        </div>
        {props.showSettings
          ?
        <div>
        <SettingsContainer typeTime={props.typeTime}
                           changeSettingsState={props.changeSettingsState}
                           changeFinalTime={props.changeFinalTime}/>
        </div>
          :
        null}
      </div>
    )
}

const SettingsContainer = props => {
  changeTime = e => {
    props.changeFinalTime(e.target.value, e.target.id)
  }
  return (
    <div className='settings-container'>
    <div className='caption'> Settings: </div>
      <div className='option'>
        <label htmlFor="pomodoro">Pomodoro time: </label>
        <input id="pomodoro" type="number" min="0" name="pomodoro" value={props.typeTime.pomodoro} onChange={changeTime}/>
      </div>
      <div className='option'>
        <label htmlFor="shortBreak">Short Break time: </label>
        <input id="shortBreak" type="number" min="0" name="shortBreak" value={props.typeTime.shortBreak} onChange={changeTime} />
      </div>
      <div className='option'>
        <label htmlFor="longBreak">Long Break time: </label>
        <input id="longBreak" type="number" min="0" name="longBreak" value={props.typeTime.longBreak} onChange={changeTime}/>
      </div>
    </div>
  )
}

const StartStopButton = props => {
  return (
    <button onClick={props.changeStatus}> {props.isActive ? 'Pause' : 'Start'} </button>
  )
}

const ModeButtons = props => {

    return (
      <div>
      <button onClick={() => props.changetype('pomodoro')} className={(props.type == 'pomodoro' ? 'active' : '')}> Pomodoro </button>
      <button onClick={() => props.changetype('shortBreak')} className={(props.type == 'shortBreak' ? 'active' : '')}> Short Break </button>
      <button onClick={() => props.changetype('longBreak')} className={(props.type == 'longBreak' ? 'active' : '')}> Long Break </button>
      </div>
    )

}


ReactDOM.render(<MainContainer />, document.getElementById("root"));
