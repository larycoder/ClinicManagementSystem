const $tableID = $('#table');
const $BTN = $('#export-btn');
const $EXPORT = $('#export');

const newTr = `
<tr>
<td width="15%">
  <div class="form-group">
    <select class="form-control selectpicker" data-live-search="true">
      <option>None</option>
      <option data-tokens="take medicine">Take Medicine</option>
      <option data-tokens="inject">Inject</option>
      <option data-tokens="blood test">Blood Test</option>
      <option data-tokens="ct scan">CT Scan</option>
    </select>
  </div> 
</td>
<td class="pt-3-half" width="10%" contenteditable="true">1</td>
<td class="pt-3-half" width="15%" contenteditable="true">
  <div class="form-group">
    <select class="form-control selectpicker" data-live-search="true">
      <option>None</option>
      <option data-tokens="insulin glargine">insulin glargine</option>
      <option data-tokens="paracetamon">paracetamon</option>
      <option data-tokens="morphine">morphine</option>
      <option data-tokens="benzonatate">benzonatate</option>
    </select>
  </div> 
</td>
<td class="pt-3-half" width="20%">
  <div class="input-group">
    <input type="number" class="form-control" style="float: left;">
    <select class="form-control" style="float: left;">
      <option>None</option>
      <option>ml</option>
      <option>boxes</option>
    </select>
  </div>  
</td>
<td class="pt-3-half" width="30%" contenteditable="true" style="word-wrap: break-word"></td>
<td width="10%">
  <span class="table-remove"><button type="button"
      class="btn btn-danger btn-rounded btn-sm my-0">Remove</button></span>
</td>
</tr>`;

$('.table-add').on('click', 'i', () => {
  const $clone = $tableID.find('tbody tr').last().clone(true).removeClass('hide table-line');

  if ($tableID.find('tbody tr').length === 0) {

    $('tbody').append(newTr);
  }

  $tableID.find('table').append($clone);
});

$tableID.on('click', '.table-remove', function () {

  $(this).parents('tr').detach();
});

$tableID.on('click', '.table-up', function () {

  const $row = $(this).parents('tr');

  if ($row.index() === 1) {
    return;
  }

  $row.prev().before($row.get(0));
});

$tableID.on('click', '.table-down', function () {

  const $row = $(this).parents('tr');
  $row.next().after($row.get(0));
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.on('click', () => {

  const $rows = $tableID.find('tr:not(:hidden)');
  const headers = [];
  const data = [];

  // Get the headers (add special header logic here)
  $($rows.shift()).find('th:not(:empty)').each(function () {

    headers.push($(this).text().toLowerCase());
  });

  // Turn all existing rows into a loopable array
  $rows.each(function () {
    const $td = $(this).find('td');
    const h = {};

    // Use the headers from earlier to name our hash keys
    headers.forEach((header, i) => {

      h[header] = $td.eq(i).text();
    });

    data.push(h);
  });

  // Output the result
  $EXPORT.text(JSON.stringify(data));
});

