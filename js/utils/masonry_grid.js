/**
 * gridInit: Creates columns dynamically and initializes their heights.
 * @param {*} $gridContainer  grid container
 * @return  column and columns height array
*/

export const gridInit = ($gridContainer) => {

  const $columns = [];
  const columnsHeight = []; //Tracks the current height of each column (initialized to 0)

  const columnCount = Number(getComputedStyle($gridContainer).getPropertyValue("--column-count"))//It retrieves the number of columns (--column-count) specified in the CSS of the grid container.

  for (let i = 0; i < columnCount; i++) {

    const $column = document.createElement('div');
    $column.classList.add('column');
    $gridContainer.appendChild($column);
    $columns.push($column);
    columnsHeight.push(0);


  }

  return { $columns, columnsHeight };

}


/**
 * updateGrid: Places a grid item into the shortest column and updates the column's height.
 * @param {*} $card  grid item
 * @param {*} columnHeight height of the all columns
 * @param {*} $columns All columns
 */
export const updateGrid = ($card, columnsHeight, $columns) => {

  const minColumnHeight = Math.min(...columnsHeight);//Math.min to find the minimum height in columnsHeight.

  const minColumnIndex = columnsHeight.indexOf(minColumnHeight);//Finds the index of this minimum height


  $columns[minColumnIndex].appendChild($card);  //Appends the $card (grid item) to the column with the shortest height:

  columnsHeight[minColumnIndex] = $columns[minColumnIndex].offsetHeight; //Updates the height of the column in columnsHeight based on the offsetHeight of the column after appending the item.

}


