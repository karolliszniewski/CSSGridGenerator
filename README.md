# CSSGridGenerator

This Git repository contains a CSS Grid Generator built using pure HTML, CSS, and Vanilla JavaScript. It allows users to easily create and customize CSS Grid layouts. Additionally, Syntax highlighting from highlightjs.org is used to highlight code on the page.

In version 1.0, it is possible to enable a grid that will generate CSS and HTML code. However, currently, the selected elements are not saved anywhere and the code is not generated.
![image](https://user-images.githubusercontent.com/105976690/227215930-cd5d9b9e-cbd4-4e03-ae76-083e1f1fa600.png)

The code features a grid generator placed in the "GridGenerator" class, which includes several methods.

The "initializeSelectionCoordinates" method takes information on the row and column from which the grid selection should start and end.

The "getMinMaxValues" method allows for placing these values in a loop for dynamic selection of elements as the mouse is moved while holding down the mouse button.

The "selectGridArea" method contains a loop that adds the "selected" class to the selected children of the container.

The "updateColumnsAndRows" method allows the user to change the number of columns and rows.

The "clearLiveSelection" method removes the "selected" class from the container children, so only the currently selected elements by "selectGridArea" are highlighted, and not all the children of the container

The code will be updated, and perhaps the logic will also change. Currently, it's a skeleton for a generator. The next step is to start remembering all the selections in the HTML and JavaScript code so that based on this, the appropriate CSS and HTML code can be created, which can be copied and used in your project.

change log v1.1

* Fixed: Centered the information in the footer.
* Fixed: Corrected any mistakes related to the BEM (Block Element Modifier) convention.
* Added: Class SelectionHistory.
* Added: Variable historyArray.

-v1.2

In version 1.2, I added the ability to select multiple fields consecutively, blend colors of those fields, and introduce a dynamic highlighting effect. Also, temporary color blending occurs while holding down the mouse button, which becomes permanent only after releasing the 'mouseup' event.

![chrome-capture-2023-3-3 (2)](https://user-images.githubusercontent.com/105976690/229590779-5e12a7a5-f0c1-4f0f-ae57-7d88f423c449.gif)

changelog 1.2
- Added: a new class that contains the sequence in which new colors will appear when selected, as well as the current colors that are saved during selection. The base color is assigned to the container's 2000 children, and then the colors are mixed and overwritten
- Added: a new method called "colorCombine" to the GridGenerator class, which is responsible for mixing colors.
- Updated:  The color saving method has been changed. Now, colors are not saved in the class and assigned to the child element. Instead, colors are directly included in the child elements of the container. This allows for easier mixing of colors without the need to use built-in CSS functions, which did not meet expectations when it came to mixing too many colors together.
- Updated: selectGridArea now includes 3 parameters: an integer, a boolean, and an object that stores previously selected colors and allows for their updating.
- Updated: updateColumnsAndRows now uses colors from the SelectionColors class when creating children in the container--js container.
- Updated: clearLiveSelection now uses colors from the SelectionColors object passed into the method, which prevents clearing previously selected areas.

