// highlight.js activate
hljs.highlightAll();



class SelectionHistory{

  constructor(startColumn,endColumn,startRow,endRow){
    this.startColumn = parseInt(startColumn)
    this.endColumn = parseInt(endColumn)
    this.startRow = parseInt(startRow)
    this.endRow = parseInt(endRow)
  }



}




// class
class GridGenerator{

  isMouseDown = false;
  startSquare = null;
  endSquare = null;
  gridArea = 1;

  constructor(containerId){
    this.container = document.getElementById(containerId)
  }

  initializeSelectionCoordinates(){
    this.startColumn = parseInt(this.startSquare.dataset.column)
    this.startRow = parseInt(this.startSquare.dataset.row)
    this.endColumn = parseInt(this.endSquare.dataset.column)
    this.endRow = parseInt(this.endSquare.dataset.row)
  }

  getMinMaxValues(){
    this.minRow = Math.min(this.startRow,this.endRow)
    this.maxRow = Math.max(this.startRow,this.endRow)
    this.minColumn = Math.min(this.startColumn,this.endColumn)
    this.maxColumn = Math.max(this.startColumn,this.endColumn)
    
  }

  selectGridArea(className){
    for(let i = this.minRow;i<=this.maxRow;i++)
    {
      for(let j= this.minColumn;j<=this.maxColumn;j++){
        const square = document.querySelector(`.square[data-row="${i}"][data-column="${j}"]`);
        
        square.dataset.select = this.gridArea;
        square.classList.add(className);
        
     
      }
      
    }
  }

  
  updateColumnsAndRows(){
    
    

    const columns = parseInt(document.getElementById("options__columns").value)
    const rows = parseInt(document.getElementById("options__rows").value)
    this.container.style.setProperty('grid-template-columns', `repeat(${columns}, minmax(min-content, auto))`);
    
    while(this.container.firstChild){
      this.container.removeChild(this.container.firstChild)
    }

    const elementsNumber = columns * rows

    let createColumn = 1;
    let createRows = 1;
    for(let i = 1;i<=elementsNumber;i++)
    {
      const childElement = document.createElement('div')
      childElement.setAttribute('data-column',createColumn)
      childElement.setAttribute('data-row',createRows)
      childElement.className = "square";
      this.container.appendChild(childElement)

     createRows = (createColumn < columns) ? createRows : createRows + 1;
     createColumn = (createColumn < columns) ? createColumn + 1 : 1;
    }
  }

  clearLiveSelection(){
    const columns = parseInt(document.getElementById("options__columns").value)
    const rows = parseInt(document.getElementById("options__rows").value)

    for(let i = 1;i<=rows;i++)
    {
      for(let j= 1;j<=columns;j++){
        // Remove the class from all squares to reset the selection preview
        const square = document.querySelector(`.square[data-row="${i}"][data-column="${j}"]`);
        square.classList.remove("selected");
        
        
      }
      
    }
  }



}


// Declare and initialize constants and variables with the HTML elements required for the functionality.
const gridGenerator = new GridGenerator("container--js")

// Declare array with contains selection history
let historyArray = []



// Register an event listener for when the mouse button is pressed down
gridGenerator.container.addEventListener("mousedown",(event)=>{
  gridGenerator.isMouseDown = true
  gridGenerator.startSquare = event.target
  gridGenerator.endSquare = event.target

  event.target.classList.add("selected")
})



// Register an event listener for when the mouse button is released
gridGenerator.container.addEventListener("mouseup", () =>{

  gridGenerator.clearLiveSelection();
  gridGenerator.initializeSelectionCoordinates()
  gridGenerator.getMinMaxValues()
  gridGenerator.selectGridArea("selected2")
  
  // add selection to history
  let section = new SelectionHistory(gridGenerator.startColumn,gridGenerator.endColumn,gridGenerator.startRow,gridGenerator.endRow)
  historyArray.push(section)
  console.log(historyArray)


  gridGenerator.gridArea++;
  gridGenerator.isMouseDown = false;
  gridGenerator.startSquare = null;
  gridGenerator.endSquare = null;



})

// Register an event listener for when the mouse moves over the container
gridGenerator.container.addEventListener("mouseover", (event) => {
  
  // Check if the mouse button is pressed down
  if(gridGenerator.isMouseDown){
    gridGenerator.endSquare = event.target;


    //Clears "selected" classes from squares to create live effect.
    gridGenerator.clearLiveSelection();
    // Initializes the start and end column/row coordinates for a selected square by parsing its dataset attributes.
    gridGenerator.initializeSelectionCoordinates()
    // Calculates the minimum and maximum row and column values for the selected square, using the start and end row/column coordinates 
    gridGenerator.getMinMaxValues()
    // Selects a grid area by iterating through each square within the minimum and maximum row and column values, setting their "select" dataset attribute to the current grid area and adding a specified class name to their class list
    gridGenerator.selectGridArea("selected")
    
  }

})


//update used to create all child on pageload
gridGenerator.updateColumnsAndRows()
const update = document.getElementById("js-submit")

update.addEventListener('click', gridGenerator.updateColumnsAndRows.bind(gridGenerator));