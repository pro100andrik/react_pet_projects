
class MainContainer extends React.Component {
  render(){
    return(
      <div className="mainContainer">
      <Caption />
      <ListContainer taskList={TASKS} />
      <Credits />
      </div>
    )
  }
}


function Caption(){
  return (
    <div className='Caption'>ToDo List</div>
  )
}


class ListContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tasks: this.props.taskList,
      buttonIsVisible: new Array(this.props.taskList.length).fill(false),
      showType: 'showAll',
      showRemoveButton: this.props.taskList.map(el => el.isChecked).includes(true)
    }
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleIsChecked = this.handleIsChecked.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleButtonVisibility = this.handleButtonVisibility.bind(this);
    this.handleItemsVisibility = this.handleItemsVisibility.bind(this);
    this.handleRemoveCompleted = this.handleRemoveCompleted.bind(this);
  }
  handleButtonVisibility(index){
    this.setState(prevState => ({
      buttonIsVisible: prevState.buttonIsVisible.map((el, i) => i != index ? el : !el)
    }))
  }

  handleAddItem(taskName){
    this.setState(({
       tasks: [...this.state.tasks, {task:taskName, isChecked: false}],
       buttonIsVisible: [...this.state.buttonIsVisible, false]
    }))
  }

  handleIsChecked(target){
    this.setState(prevState => ({
      tasks: prevState.tasks.map((el, index) => {
          if(index == target)el.isChecked = !el.isChecked;
        return el;
      }),
      showRemoveButton: this.state.tasks.map(el => el.isChecked).includes(true)
      }));
  }

  handleDeleteItem(target){
    this.setState(prevState => ({
      tasks: prevState.tasks.filter((el, i) => target != i),
      buttonIsVisible: prevState.buttonIsVisible.filter((el, index) => index < prevState.buttonIsVisible.length - 1),
      showRemoveButton: prevState.tasks.filter((el, i) => target != i).map(el => el.isChecked).includes(true)
    }))
  }

  handleRemoveCompleted(){
    this.setState(prevState => ({
      tasks: prevState.tasks.filter((el, i) => !el.isChecked),
      buttonIsVisible: prevState.buttonIsVisible.filter((el, index) => index < prevState.buttonIsVisible.length - 1),
      showRemoveButton: false
    }))
  }

  handleItemsVisibility(type){
    this.setState({
      showType: type
    })
  }

  render(){
      return(
      <div><ul>
      <TextArea handleAddItem={this.handleAddItem} />
      <ListOfItems
        taskList={this.state.tasks}
        handleCheck={this.handleIsChecked}
        buttonIsVisible={this.state.buttonIsVisible}
        handleDeleteItem={this.handleDeleteItem}
        handleButtonVisibility={this.handleButtonVisibility}
        showType={this.state.showType}
      /></ul>
      <Controls
        taskList={this.state.tasks}
        handleItemsVisibility={this.handleItemsVisibility}
        handleRemoveCompleted={this.handleRemoveCompleted}
        showRemoveButton={this.state.showRemoveButton}
      />
      </div>
    )
  }
}

class TextArea extends React.Component{
  constructor(props){
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e){
    if(e.code != 'Enter') return;
    if(e.target.value == '') {
      alert('enter something')
      return;
   }
    this.props.handleAddItem(e.target.value);
    e.target.value = ''
  }

  render(){
    return(
      <span className='input-span'>
      <input type='text'
        className='input-text'
        placeholder='Input you task here'
        onKeyDown={this.handleKeyDown}/>
      </span>
    )
  }
}

class ListOfItems extends React.Component{
  constructor(props){
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  handleCheck(e){
    this.props.handleCheck(e.target.value)
  }

  handleButtonClick(index){
    this.props.handleDeleteItem(index)
  }

  handleMouseEnter(index){
    this.props.handleButtonVisibility(index);
  }

  handleMouseLeave(index){
    this.props.handleButtonVisibility(index);
  }

  render(){
    let filteredTasks = this.props.taskList;
    if(this.props.showType == 'showActive'){
      filteredTasks = this.props.taskList.filter(el => !el.isChecked)
    }else if (this.props.showType == 'showCompleted')[
      filteredTasks = this.props.taskList.filter(el => el.isChecked)
    ]
    return(
      filteredTasks.map((element, index) =>
                          <li key={index}
                          onMouseEnter={() => this.handleMouseEnter(index)}
                          onMouseLeave={() => this.handleMouseLeave(index)}>
                            <input type='checkbox'
                              value={index}
                              checked={element.isChecked}
                              onChange={this.handleCheck}
                              className='checkbox'>
                            </input>
                            <span className={element.isChecked ? 'text checked-element' : 'text'} >{element.task}</span>
                            <button className={this.props.buttonIsVisible[index] ? 'close-button' : 'close-button hiden'}
                            onClick={() => this.handleButtonClick(index)}>X</button>
                          </li>)
    )
  }
}

class Controls extends React.Component{
  constructor(props){
    super(props);
    this.handleVisibility = this.handleVisibility.bind(this);
    this.handleRemoveCompleted = this.handleRemoveCompleted.bind(this);
  }

  countLeftItems(array) {
    let count = 0;
    for (let item of array){
      if (!item.isChecked) count++;
    }
    return count;
  }

  handleVisibility(type){
    this.props.handleItemsVisibility(type);
  }

  handleRemoveCompleted(){
    this.props.handleRemoveCompleted();
  }

  render(){
    return(
      <div className='controls'>
        <span className='items-counter'> {this.countLeftItems(this.props.taskList)} items left</span>
        <span className='visibility-buttons'>
          <button onClick={() => this.handleVisibility('showAll')}>Show all</button>
          <button onClick={() => this.handleVisibility('showActive')}>Active</button>
          <button onClick={() => this.handleVisibility('showCompleted')}>Completed</button>
        </span>
        <span className='remove-button'><button onClick={this.handleRemoveCompleted} className={this.props.showRemoveButton ? '' : 'hiden'}>Remove Completed</button></span>
      </div>
    )
  }
}

function Credits(){
  return (
     <div className='credits'>
     double click to edit <br />
     created by <span className='autor-name'> KonAnd </span> <br />
     for Portfolio
     </div>
  )
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



const TASKS = [
  {task: 'clean home',isChecked: false},
  {task: 'go clean myself in the bathroom',isChecked: false},
  {task: 'play on guitar',isChecked: true},
  {task: 'learn react',isChecked: false},
  {task: 'go to store',isChecked: false},
]


ReactDOM.render(<MainContainer />, document.getElementById("root"));
