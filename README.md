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


-v1.3

Fixed gaps:

![chrome-capture-2023-3-10](https://user-images.githubusercontent.com/105976690/230891547-1164e8b0-60d6-44cc-8da6-103b38a33688.gif)


The CSS and HTML code is now dynamically generated on the "mouseup" event.
![chrome-capture-2023-3-10 (1)](https://user-images.githubusercontent.com/105976690/230891979-321db52a-aaa4-43bf-8f98-d82c5958c2c1.gif)



changelog 1.3
- Fixed: A fix has been made to the preview and code sections to ensure that gaps now work properly.
- Added: New class called "CodeGenerator" that includes methods for generating HTML and CSS code box content on the page.
- Added: A new method called "createHtmlCode" has been added to the software. This method generates HTML code for the grid layout that has been selected by the user within the grid area.
- Added: The second method, named "createCssCode," generates CSS code for each child of the selected grid layout by utilizing the values for columns, rows, and gaps that have been previously set by the user in the input fields.
- Updated: The GridGenerator has been updated to include hljs within the object. This enables the highlighting of text after certain actions when the page is loaded.
- Updated: The GridGenerator has been updated to now have access to the CodeGenerator class.
- Added: A new method has been added to the GridGenerator called "getGridOptions." This method eliminates redundancy in another part of the code by enabling the selection of grid properties as an object in a single line of code.
- Updated: "The "updateColumnsAndRows" function has been updated to enable the retrieval of object data in a single line of code."
- Updated:  The updated "updateColumnsAndRows" function triggers the "createHtmlCode" and "createCssCode" methods which make changes to the page structure. Additionally, the "highlightAll" function is triggered to recolorize the text.
- Updated: The mouseup event has been updated to trigger the "createHtmlCode" and "createCssCode" methods, enabling the dynamic creation of code when the user selects an area on the GridGenerator.

