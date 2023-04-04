

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


class SelectionColors{


  constructor(){
    this.color = []; // define
    this.color[0] = [20, 20, 34] // base color
    this.color[1] = [44, 116, 179]
    this.color[2] = [91, 143, 185]
    this.color[3] = [20, 66, 114] 
    this.color[4] = [193, 71, 233]
    this.color[5] = [19, 0, 90] 
    this.color[6] = [129, 12, 168]
    this.color[7] = [32, 82, 149]
    this.color[8] = [45, 3, 59]
    this.color[9] = [10, 38, 71]
    this.color[10] = [232, 15, 136]
    this.color[11] = [229, 184, 244]
    this.color[12] = [175, 1, 113]
    this.color[13] = [252, 255, 130]
    this.color[14] = [175, 197, 255]
    this.color[15] = [255, 52, 127]
    this.color[16] = [44, 120, 108]
    this.color[17] = [248, 180, 0]
    this.color[18] = [164, 251, 227]
    this.color[19] = [174, 204, 198]
    this.color[20] = [236, 114, 156]
    this.color[21] = [240, 120, 16]
    this.color[22] = [248, 218, 91]
    this.color[23] = [217, 182, 80]
    this.color[24] = [255, 0, 0]
    this.color[25] = [255, 170, 165]
    this.color[26] = [39, 114, 219]
    this.color[27] = [240, 93, 35]
    this.color[28] = [255, 133, 133]
    this.color[29] = [29, 173, 155]
    this.cellColor = [];
    for(let i=1;i<=2000;i++)
    {
    this.cellColor[i] = this.color[0]
    }


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

  colorCombine(color1,color2){

    const colorMix = color1.map((x,i) => 
    {
     return Math.round(x * 0.5 + color2[i] * 0.5)

    }
    )
    
return colorMix
  }
  

  selectGridArea(selectionNumber,updateCells,selectionColors){

    for(let i = this.minRow;i<=this.maxRow;i++)
    {
   
      for(let j= this.minColumn;j<=this.maxColumn;j++)
      {
        const square = document.querySelector(`.square[data-row="${i}"][data-column="${j}"]`);
        const squareId = square.id
        const squareColor = square.style.backgroundColor
        const colorArray = squareColor.substring(4, squareColor.length-1).replace(/ /g, '').split(',');

        square.dataset.select = this.gridArea;
        const combineColors = this.colorCombine(colorArray,selectionColors.color[selectionNumber])
        
        console.log( `${colorArray}) vs ${selectionColors.color[selectionNumber]}`)
        square.style.backgroundColor = `rgb(${combineColors.join(", ")})`

        selectionColors.cellColor[squareId] = (updateCells == true) ? combineColors : selectionColors.cellColor[squareId]
   
      }    
    }
  }

  
  updateColumnsAndRows(){
    const getColors = new SelectionColors()
    const columns = parseInt(document.getElementById("options__columns").value)
    const rows = parseInt(document.getElementById("options__rows").value)
    this.container.style.setProperty('grid-template-columns', `repeat(${columns}, minmax(min-content, auto))`);
    
    while(this.container.firstChild){
      this.container.removeChild(this.container.firstChild)
    }

    const elementsNumber = columns * rows
    
    this.selectionNumbers = elementsNumber
    let createColumn = 1;
    let createRows = 1;
    for(let i = 1;i<=elementsNumber;i++)
    {
      const childElement = document.createElement('div')
      childElement.setAttribute('data-column',createColumn)
      childElement.setAttribute('data-row',createRows)
      childElement.setAttribute('id',i)
      childElement.className = "square";
      childElement.style.backgroundColor = `rgb(${getColors.color[0].join(", ")})`
      this.container.appendChild(childElement)

     createRows = (createColumn < columns) ? createRows : createRows + 1;
     createColumn = (createColumn < columns) ? createColumn + 1 : 1;
    }
  }

  clearLiveSelection(colors){
    const columns = parseInt(document.getElementById("options__columns").value)
    const rows = parseInt(document.getElementById("options__rows").value)
    
    for(let i = 1;i<=rows;i++)
    {
      for(let j= 1;j<=columns;j++){
        // Remove the class from all squares to reset the selection preview
        const square = document.querySelector(`.square[data-row="${i}"][data-column="${j}"]`);
        const squareId = square.id
        square.style.backgroundColor = `rgb(${colors.cellColor[squareId].join(", ")})`
        
        
      }
      
    }
  }



}


// Declare and initialize constants and variables with the HTML elements required for the functionality.
const gridGenerator = new GridGenerator("container--js")
// Create SelectionColors object
const selectionColors = new SelectionColors()

let selectionNumber = 1;

//update used to create all child on pageload
gridGenerator.updateColumnsAndRows()

//allow user to update columns and rows
const update = document.getElementById("submit--js")
update.addEventListener('click', gridGenerator.updateColumnsAndRows.bind(gridGenerator));

// Declare array with contains selection history // probably not the best way to do this
let historyArray = []



// Register an event listener for when the mouse button is pressed down
gridGenerator.container.addEventListener("mousedown",(event)=>{
  gridGenerator.isMouseDown = true
  gridGenerator.startSquare = event.target
  gridGenerator.endSquare = event.target
})




// Register an event listener for when the mouse moves over the container
gridGenerator.container.addEventListener("mouseover", (event) => {
  
  // Check if the mouse button is pressed down
  if(gridGenerator.isMouseDown){
    gridGenerator.endSquare = event.target;


    //Clears "selected" classes from squares to create live effect.
    gridGenerator.clearLiveSelection(selectionColors);
    // Initializes the start and end column/row coordinates for a selected square by parsing its dataset attributes.
    gridGenerator.initializeSelectionCoordinates()
    // Calculates the minimum and maximum row and column values for the selected square, using the start and end row/column coordinates 
    gridGenerator.getMinMaxValues()
    // Selects a grid area by iterating through each square within the minimum and maximum row and column values, setting their "select" dataset attribute to the current grid area and adding a specified class name to their class list
    gridGenerator.selectGridArea(selectionNumber,false,selectionColors)
  }

})


// Register an event listener for when the mouse button is released
gridGenerator.container.addEventListener("mouseup", () =>{

  gridGenerator.clearLiveSelection(selectionColors);
  gridGenerator.initializeSelectionCoordinates()
  gridGenerator.getMinMaxValues()
  gridGenerator.selectGridArea(selectionNumber,true,selectionColors)
  selectionNumber++;
  
  // add selection to history
  let section = new SelectionHistory(gridGenerator.startColumn,gridGenerator.endColumn,gridGenerator.startRow,gridGenerator.endRow)
  historyArray.push(section)


  gridGenerator.gridArea++;
  gridGenerator.isMouseDown = false;
  gridGenerator.startSquare = null;
  gridGenerator.endSquare = null;



})




