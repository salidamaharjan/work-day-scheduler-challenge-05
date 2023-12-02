// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // locating the div with class container-lg
  var $mainContainer = $(".container-lg");

  //displaying current date on the header
  var $pTag = $("#currentDay");
  $pTag.append(dayjs().format("dddd, MMMM Do"));

  // I want to create 9 rows so using for loop
  for (var i = 9; i < 18; i++) {
    creatingRow(i);
  }

  function creatingRow(hour) {
    //creating a variable to store the row which has three column
    //using string interpolation to add the hour passed when called
    var displayTimeAmPm = displayTime(hour) + isAmOrPM(hour);
    var $row =
      $(`<div id="hour-${hour}" class="row time-block ${isPastPresentFuture(
        hour
      )}">
  <div class="col-2 col-md-1 hour text-center py-3">${displayTimeAmPm}</div>
  <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
  </button>
</div> 
`);
    // finding a button created in a row
    var $text = $row.find("textarea");
    var $saveBtn = $row.find(".saveBtn");

    //displaying the stored value on the text area
    $text.val(getFromLocalStorage(hour));

    clickedSaveBtn($saveBtn, $text, hour);

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
    var time = hour;
    if (hour <= 12) {
      return time;
    } else {
      time = time - 12;
      return time;
    }
  }

  //need to change the color according to the current time
  function isPastPresentFuture(comparedHour) {
    var dayFormat = parseInt(dayjs().format("HH"));
    if (comparedHour < dayFormat) {
      return "past";
    } else if (comparedHour > dayFormat) {
      return "future";
    } else {
      return "present";
    }
  }
  //adding event listener on click and storing to local storage
  function clickedSaveBtn($btn, $text, hour) {
    var hourTask = hour + "-" + "task";
    $btn.on("click", function () {
      localStorage.setItem(hourTask, $text.val());
    });
  }
  //a function to store in local storage
  function getFromLocalStorage(hour) {
    var hourTask = localStorage.getItem(hour + "-" + "task");
    return hourTask;
  }
});
