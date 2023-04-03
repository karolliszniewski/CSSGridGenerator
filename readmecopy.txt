This Git repository contains a CSS Grid Generator built using pure HTML, CSS, and Vanilla JavaScript. It allows users to easily create and customize CSS Grid layouts.

In version 1.0, it is possible to enable a grid that will generate CSS and HTML code. However, currently, the selected elements are not saved anywhere and the code is not generated. image

The code features a grid generator placed in the "GridGenerator" class, which includes several methods.

The "initializeSelectionCoordinates" method takes information on the row and column from which the grid selection should start and end.

The "getMinMaxValues" method allows for placing these values in a loop for dynamic selection of elements as the mouse is moved while holding down the mouse button.

The "selectGridArea" method contains a loop that adds the "selected" class to the selected children of the container.

The "updateColumnsAndRows" method allows the user to change the number of columns and rows.

The "clearLiveSelection" method removes the "selected" class from the container children, so only the currently selected elements by "selectGridArea" are highlighted, and not all the children of the container

The code will be updated, and perhaps the logic will also change. Currently, it's a skeleton for a generator. The next step is to start remembering all the selections in the HTML and JavaScript code so that based on this, the appropriate CSS and HTML code can be created, which can be copied and used in your project.

change log v1.1

1.fix footer info
.footer__info{
text-align:center;
}


changelog 1.2
- Added: a new class that contains the sequence in which new colors will appear when selected, as well as the current colors that are saved during selection. The base color is assigned to the container's 2000 children, and then the colors are mixed and overwritten
- Added: a new method called "colorCombine" to the GridGenerator class, which is responsible for mixing colors.
- Updated:  The color saving method has been changed. Now, colors are not saved in the class and assigned to the child element. Instead, colors are directly included in the child elements of the container. This allows for easier mixing of colors without the need to use built-in CSS functions, which did not meet expectations when it came to mixing too many colors together.
