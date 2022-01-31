/**
 * Sorts a HTML table.
 * 
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be in ascending
 */
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});

$(document).ready(function(){
  $("button").click(function(){
    $.get("https://wt.ops.labs.vu.nl/api22/4dc7a89f/reset", function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
    });
  });
});

$(document).ready(function(){
      $.ajax({
          url:"https://wt.ops.labs.vu.nl/api22/4dc7a89f",
          type: "GET",
          dataType: "json",
          success: function(data){
        var phoneData = '';
        $.each(data,function(key,value){
          phoneData += '<tr>';
          phoneData += '<td>' + value.brand + '</td>';
          phoneData += '<td>' + value.model + '</td>';
          phoneData += '<td>' + value.os + '</td>';
          phoneData += '<td>' + value.screensize + '</td>';
          phoneData += '<td>' + value.image + '</td>';
          phoneData += '</tr>';
          
        });
        $("#test123").append(phoneData);
      }
        
        
      });
    var $newphoneData = $('#test123');
      var $brand = $('#brand');
      var $model = $('#model');
      var $os = $('#os');
      var $screensize = $('#screensize');
      var $image = $('#image');
      
      $('form').on('Submit',function(e){
      
      e.prevenDefault(this);
      var phonesData = {
      brand: $brand.val(),
      model: $model.val(),
      os: $os.val(),
      screensize: $screensize.val(),
      image: $image.val(),
      };
      
      $.ajax({
      url:"https://wt.ops.labs.vu.nl/api22/4dc7a89f",
      type: "POST",
      data: "phonesData",
      dataType: "json",
      success: function(newData){
      $newphoneData.append('<tr>');
      $newphoneData.append('<td>' + newData.brand + '</td>');
      $newphoneData.append('<td>' + newData.model + '</td>');
      $newphoneData.append('<td>' + newData.os + '</td>');
      $newphoneData.append('<td>' + newData.screensize + '</td>');
      $newphoneData.append('<td>' + newData.image + '</td>');
      $newphoneData.append('</tr>');
      
      
      }
      
      });
      
      });
      
      
    });

