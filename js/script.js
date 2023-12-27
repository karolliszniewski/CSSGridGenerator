//When all data is ready, generate HTML and CSS code
class CodeGenerator{

  constructor(){
    this.htmlCode = document.querySelector(".codes__html")
    this.cssCode = document.querySelector(".codes__css")
  }

  // Each time when user select new area, generate new HTML and add child divs
  createHtmlCode(childsNumber,selectionNumber){
   
    let textCode = `<div class="container">`
    console.log(selectionNumber)
    for(let i=1;i<selectionNumber;i++)
    {
        textCode += 
        `
        <div class="child${i}"></div>`
    }

    textCode += `
</div>`
    textCode = textCode.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    this.htmlCode.innerHTML = textCode
  }

  // Each time when user select new area, or Update options, generate new CSS code
  createCssCode(columns,rows,columnsGap,rowsGap,selectionNumber,historyArray){

      // generate CSS code for container
    let textCode = `.container{
      display: grid;
      grid-template-columns: repeat(${columns}, 1fr);
      grid-template-rows: repeat(${rows}, 1fr);
      grid-column-gap: ${columnsGap}px;
      grid-row-gap: ${rowsGap}px;
      }`
      const selectionNumberInteger = parseInt(selectionNumber)
    
      // generate CSS code for each child
      for(let i=1;i<selectionNumberInteger;i++){
        console.log(historyArray[i-1])
        // grid child will start on lovest value and end on highest value
        const startColumn = Math.min(historyArray[i-1].startColumn,historyArray[i-1].endColumn)
        const endColumn = Math.max(historyArray[i-1].startColumn,historyArray[i-1].endColumn)
        const startRow = Math.min(historyArray[i-1].startRow,historyArray[i-1].endRow)
        const endRow = Math.max(historyArray[i-1].startRow,historyArray[i-1].endRow)


        textCode += `
        .child${i}{
          grid-area: ${startRow} / ${startColumn} / ${endRow + 1} / ${endColumn + 1};
        }`
      }

      this.cssCode.innerHTML = textCode
  }
  
 

}



/**
 * Represents a selection history object that tracks the start and end columns and rows of a user's selection
 * within a CSS grid. Multiple instances of this class can be stored in an array and passed to another object
 * to generate CSS grid code.
 */
class SelectionHistory{

  constructor(startColumn,endColumn,startRow,endRow){
    this.startColumn = parseInt(startColumn)
    this.endColumn = parseInt(endColumn)
    this.startRow = parseInt(startRow)
    this.endRow = parseInt(endRow)
  }



}

// Selection colors class that stores an array of colors that can be used to color the user's selections.
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




// class to generate grid and handle all grid related functionality
class GridGenerator{

  isMouseDown = false;
  startSquare = null;
  endSquare = null;
  gridArea = 1;

  constructor(containerId){
    this.container = document.getElementById(containerId)
    this.codeGenerator = new CodeGenerator()
    this.hljs = hljs;
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

        square.style.backgroundColor = `rgb(${combineColors.join(", ")})`

        selectionColors.cellColor[squareId] = (updateCells == true) ? combineColors : selectionColors.cellColor[squareId]
   
      }    
    }
  }

  getGridOptions() {
    const columns = parseInt(document.getElementById("options__columns").value);
    const rows = parseInt(document.getElementById("options__rows").value);
    const columnsGap = parseInt(document.getElementById("options__columnsgap").value);
    const rowsGap = parseInt(document.getElementById("options__rowsgap").value);
    return {
      columns: columns,
      rows: rows,
      columnsGap: columnsGap,
      rowsGap: rowsGap
    };
  }

  
  updateColumnsAndRows(codeGenerator){
    const getColors = new SelectionColors()
    const { columns, rows, columnsGap, rowsGap } = this.getGridOptions();

    this.container.style.setProperty('grid-template-columns', `repeat(${columns}, minmax(min-content, auto))`);
    this.container.style.setProperty('grid-column-gap', `${columnsGap}px`);
    this.container.style.setProperty('grid-row-gap', `${rowsGap}px`);
    
    while(this.container.firstChild){
      this.container.removeChild(this.container.firstChild)
    }

    const elementsNumber = columns * rows

    selectionNumber = 1;
    // here remove history of selection


    this.codeGenerator.createHtmlCode(elementsNumber,selectionNumber)
    this.codeGenerator.createCssCode(columns,rows,columnsGap,rowsGap,selectionNumber)

    this.hljs.highlightAll()
    
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

// Declare object with the code generator class to generate code for the user.
const codeGenerator = new CodeGenerator()
// Declare and initialize constants and variables with the HTML elements required for the functionality.
const gridGenerator = new GridGenerator("container--js")
// Create SelectionColors object
let selectionColors = new SelectionColors()

let selectionNumber = 1;

//update used to create all child on pageload
gridGenerator.updateColumnsAndRows(codeGenerator)

//allow user to update columns and rows
const update = document.getElementById("submit--js")
update.addEventListener('click', () => {
  gridGenerator.updateColumnsAndRows(codeGenerator, () => hljs.highlightAll());
  historyArray = []
  selectionColors = new SelectionColors()
});


// Declare array with contains selection history
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

  // add selection to history array
  let section = new SelectionHistory(gridGenerator.startColumn,gridGenerator.endColumn,gridGenerator.startRow,gridGenerator.endRow)
  historyArray.push(section)
  

  codeGenerator.createHtmlCode(gridGenerator.selectionNumbers,selectionNumber)

  const { columns, rows, columnsGap, rowsGap } = gridGenerator.getGridOptions();
  codeGenerator.createCssCode(columns, rows, columnsGap, rowsGap, selectionNumber,historyArray);

  


  gridGenerator.gridArea++;
  gridGenerator.isMouseDown = false;
  gridGenerator.startSquare = null;
  gridGenerator.endSquare = null;

  hljs.highlightAll()
})




