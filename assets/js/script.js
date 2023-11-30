// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // locating the div with class container-lg
  var $mainContainer = $(".container-lg");

  function creatingRow(hour) {
    //creating a variable to store the row which has three column
    //using string interpolation to add the hour passed when called
    var $row = $(`<div id="hour-${hour}" class="row time-block past">
  <div class="col-2 col-md-1 hour text-center py-3">${
    displayTime(hour) + isAmOrPM(hour)
  }</div>
  <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
  </button>
</div> 
`);
    //adding the a row to the main div
    $mainContainer.append($row);
  }
  //want to add AM and PM to the displayed time
  function isAmOrPM(hour) {
    if (hour < 12) {
      return "AM";
    } else {
      return "PM";
    }
  }
  //I want to change military time to normal time
  function displayTime(hour) {
    if (hour <= 12) {
      var time = hour;
      return time;
    } else {
      var time = hour - 12;
      return time;
    }
  }
  console.log(displayTime(14));

  //need to change the color according to the current time
  function isPastPresentFuture(hour, amOrPm) {
    var comparedHour = hour + amOrPm;
    var dayFormat = dayjs().format("h A");
    if (comparedHour === dayFormat) {
      return "present";
    } else if (comparedHour < dayFormat) {
      return "past";
    } else {
      return "future";
    }
  }

  //I want to create 9 rows so using for loop
  for (var i = 9; i < 18; i++) {
    creatingRow(i);
  }
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
