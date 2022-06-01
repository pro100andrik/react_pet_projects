
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
      notes: [...this.state.notes, {text:'edit me', rotate: Math.floor(Math.random() * 4)}]
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
                     rotate={element.rotate}
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

  handleDeleteClick = () => {
    this.props.handleRemoveNote(this.props.index)
  }

  handleChange = e => {
    console.log(e.target.textContent)
    this.props.handleEditTextValue(e.target.textContent, this.props.index);
  }

  handleKeyDown = e => {
    if (e.code == 'Enter') {
      e.target.blur();
    }
  }

  render() {
    return (
      <div className={'note rotate' + this.props.rotate}>

        <span className='note-text'
              contentEditable="true"
              suppressContentEditableWarning={true}
              onBlur={this.handleChange}
              onKeyDown={this.handleKeyDown}
              ref={this.inputRef}>

          {this.props.text}
        </span>
      <div className='delete-button' onClick={this.handleDeleteClick}>
      <img src='./Trash.png' />
      </div>
      </div>
    )
  }
}

const MYNOTES = [
  {text:'ibuprom 10mg', rotate:  Math.floor(Math.random() * 4)},
  {text:'radius = 100mm', rotate:  Math.floor(Math.random() * 4)},
  {text:"i'm stupid", rotate:  Math.floor(Math.random() * 4)}]

ReactDOM.render(<MainContainer myNotes={MYNOTES} />, document.getElementById("root"));
