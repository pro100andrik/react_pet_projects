
class MainContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      notes: this.props.myNotes
    })
  }

  handleRemoveNote = targetIndex => {
    this.setState(prevState => ({
      notes: prevState.notes.filter((element, index) => index != targetIndex)
    }))
  }

  handleEditNote = targetIndex => {
    this.setState(prevState => ({
      notes: prevState.notes.map((element, index) => {
        if (index == targetIndex) element.isEditing = !element.isEditing
          return element
      })
    }))
  }

  handleEditTextValue = (newText, targetIndex) => {
    this.setState(prevState => ({
      notes: prevState.notes.map((element, index) => {
        if (index == targetIndex) element.text = newText;
          return element
      })
    }))
  }

  handleAddNote = () => {
    this.setState({
      notes: [...this.state.notes, {text:'edit me', isEditing: true}]
    })
  }


  render(){
    return (
      <div className='main-container'> <AddButton handleAddNote={this.handleAddNote} />
      <div className='notes-wrapper'>
      {this.state.notes.map((element, index) => {
        return <Note text={element.text}
                     key={index}
                     index={index}
                     isEditing={element.isEditing}
                     handleRemoveNote={this.handleRemoveNote}
                     handleEditNote={this.handleEditNote}
                     handleEditTextValue={this.handleEditTextValue} />
      })}
      </div>

      </div>

    )
  }
}

function AddButton (props) {
  return <div className='add-button' onClick={props.handleAddNote}>
  <div className='line vertical' />
  <div className='line horisontal' />
  </div>
}


class Note extends React.Component {
  constructor(props){
    super(props);
    this.inputRef = React.createRef();
  }

  handleEditClick = () => {
    this.props.handleEditNote(this.props.index)
  }

  handleDeleteClick = () => {
    this.props.handleRemoveNote(this.props.index)
  }

  handleEndEditing = () => {
    this.props.handleEditNote(this.props.index)
  }

  handleChange = e => {
    this.props.handleEditTextValue(e.target.value, this.props.index);
  }

  handleKeyDown = e => {
    if (e.code == 'Enter') {
      console.log('enter')
      this.handleEndEditing()
    }
  }

  componentDidUpdate(){
    if(this.props.isEditing)
    this.inputRef.current.focus();
  }
  componentDidMount(){
    if(this.props.isEditing)
    this.inputRef.current.focus();
  }


  render() {
    return (
      <div className='note'>
      {this.props.isEditing ?
        <textarea className='textarea'
               value={this.props.text}
               ref={this.inputRef}
               onChange={this.handleChange}
               onBlur={this.handleEndEditing}
               onKeyDown={this.handleKeyDown}/> :
        <span className='note-text' onClick={this.handleEditClick}>{this.props.text}</span>
      }

      <div className='delete-button' onClick={this.handleDeleteClick}> D </div>
      </div>
    )
  }
}

const MYNOTES = [
  {text:'ibuprom 10mg', isEditing: false},
  {text:'radius = 100mm', isEditing: false},
  {text:"i'm stupid", isEditing: false}]

ReactDOM.render(<MainContainer myNotes={MYNOTES} />, document.getElementById("root"));
