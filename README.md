# CSSGridGenerator
This Git repository contains a CSS Grid Generator built using pure HTML, CSS, and Vanilla JavaScript. It allows users to easily create and customize CSS Grid layouts.


In version 1.0, it is possible to enable a grid that will generate CSS and HTML code. However, currently, the selected elements are not saved anywhere and the code is not generated.
![image](https://user-images.githubusercontent.com/105976690/227215930-cd5d9b9e-cbd4-4e03-ae76-083e1f1fa600.png)


The code features a grid generator placed in the "GridGenerator" class, which includes several methods.

The "initializeSelectionCoordinates" method takes information on the row and column from which the grid selection should start and end.

The "getMinMaxValues" method allows for placing these values in a loop for dynamic selection of elements as the mouse is moved while holding down the mouse button.

The "selectGridArea" method contains a loop that adds the "selected" class to the selected children of the container.

The "updateColumnsAndRows" method allows the user to change the number of columns and rows.

The "clearLiveSelection" method removes the "selected" class from the container children, so only the currently selected elements by "selectGridArea" are highlighted, and not all the children of the container


The code will be updated, and perhaps the logic will also change. Currently, it's a skeleton for a generator. The next step is to start remembering all the selections in the HTML and JavaScript code so that based on this, the appropriate CSS and HTML code can be created, which can be copied and used in your project.
