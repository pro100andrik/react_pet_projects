


class MainContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      date: new Date(),
      renderInput: true,
      event: "your event",
      showErrMessage: false
    })
  }

  handleChangeDate = value => {
    if (new Date(Date.parse(value)) < new Date()){
      this.setState({
        showErrMessage: true
      });
      setTimeout(() => this.setState({ showErrMessage: false  }),2000)
      return false;
    }else{
      this.setState({
        date: new Date(Date.parse(value))
      })
    }
    console.log('changing time to ' + value)
  }

  handleUnmount = () => {
    if(this.state.date < new Date()){
      this.setState({
        showErrMessage: true
      });
      setTimeout(() => this.setState({ showErrMessage: false  }),2000)
    }else{
      this.setState({
        renderInput: false
      })
    }
  }

  handleUpdateEvent = eventText => {
    this.setState({
      event: eventText
    })
  }

  render(){
    return(
      <div className="mainContainer">
      {this.state.renderInput ?
        <InputField
          handleChangeDate={this.handleChangeDate}
          date={this.state.date}
          handleUnmount={this.handleUnmount}
          showErrMessage={this.state.showErrMessage}
          handleUpdateEvent={this.handleUpdateEvent} /> :
        <Countdown
          targetDate={this.state.date}
          event={this.state.event} />}
      </div>
    )
  }
}

class InputField extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.handleUnmount()
  }

  handleChange = e => {
    this.props.handleChangeDate(e.target.value)
  }

  handleTittleChange = e => {
    this.props.handleUpdateEvent(e.target.value)
  }
  render(){
    function formatDate(date){
      return (
        date.getFullYear() + '-' +
        ('0' + (+date.getMonth() + 1)).slice(-2) + '-' +
        ('0' + +date.getDate()).slice(-2) +
        'T' + date.toLocaleTimeString()
      )
    }
    return(
      <div>
        <div className='caption'>
        When <span className='event-name'><input type='text' placeholder="your event name" onChange={this.handleTittleChange} /></span>
        must happent? <br /> </div>

        {this.props.showErrMessage ? <ErrMessage /> : null}
        <div><input
                type='datetime-local'
                step='1'
                value={formatDate(this.props.date)}
                onChange={this.handleChange}
                className='datepicker'
              /></div>
        <button onClick={this.handleClick}> Show me how long to wait! </button>
      </div>
    )
  }
}

function ErrMessage () {
  return (<div className='error'> You need to pick date and time in the future</div> )
}

class Countdown extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      difference: (this.props.targetDate - new Date()) / 1000,
      showCongrats: false
    })
  }

  componentDidMount(){
    let timerInterval = setInterval( () => {
      if ((this.props.targetDate - new Date()) / 1000 < 0) {
        clearInterval(timerInterval);
        this.setState({
          showCongrats: true
        })
      } else{
        this.setState({
          difference: (this.props.targetDate - new Date()) / 1000
        })
      }
    } ,1000 )
  }

  render(){
    let diff = this.state.difference;
    let seconds = parseInt(diff % 60);
    let minutes = parseInt(diff / 60 % 60);
    let hours = parseInt(diff / 60 / 60 % 24);
    let days = parseInt(diff / 24 / 60 / 60);
    return(
      <span className='tittle-countdown'>
      Countdown to: {this.props.event}
      <table>
        <tbody>
          <tr><th>{days}</th><th>{hours}</th><th>{minutes}</th><th>{seconds}</th></tr>
          <tr><td>Days</td><td>Hours</td><td>Minutes</td><td>Seconds</td></tr>
        </tbody>
      </table>
      {this.state.showCongrats ? <div className='congrats'> CONGRATUATION! </div> : null}
      </span>
    )
  }
}


ReactDOM.render(<MainContainer />, document.getElementById("root"));
