$(document).ready(function() {
  /*
   * Insert a 'details' column to the table
   */
  var nCloneTh = document.createElement('th');
  var nCloneTd = document.createElement('td');
  nCloneTd.innerHTML = '<img src="./assets/lib/advanced-datatable/images/details_open.png">';
  nCloneTd.className = "center";

  /*
   * Initialse DataTables, with no sorting on the 'details' column
   */
  var oTable = $('#hidden-table-info').dataTable({
    "aoColumnDefs": [{
      "bSortable": false,
      "aTargets": [0]
    }],
    "aaSorting": [
      [1, 'asc']
    ]
  });

  /* Add event listener for opening and closing details
   * Note that the indicator for showing which row is open is not controlled by DataTables,
   * rather it is done here
   */

});
