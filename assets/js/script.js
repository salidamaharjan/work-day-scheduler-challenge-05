// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // locating the div with class container-lg
  var $mainContainer = $(".container-lg");
  console.log("mainContainer");

  //displaying current date on the header
  var $pTag = $("#currentDay");
  console.log("$pTag");
  $pTag.append(dayjs().format("dddd, MMMM Do"));
  console.log("$pTag.append(dayjs()");

  // I want to create 9 rows so using for loop
  for (var i = 9; i < 10; i++) {
    console.log("entering for loop");
    creatingRow(i);
    console.log("exiting for loop");
  }

  function creatingRow(hour) {
    console.log("starting of creatingRow function");
    //creating a variable to store the row which has three column
    //using string interpolation to add the hour passed when called
    console.log("before displayTimeAmPm");
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

    //when the page is refreshed onload function is called
    if(location.reload){
      onload(hour);
      //displaying the stored value on the text area
      $text.append(onload(hour));
    }
    clickedSaveBtn($saveBtn, $text, hour);
    console.log("click save button called");

    //adding the a row to the main div
    $mainContainer.append($row);
    console.log("exiting creating row function");
  }

  //want to add AM and PM to the displayed time
  function isAmOrPM(hour) {
    console.log("starting isAmOrPm function");
    if (hour < 12) {
      console.log("exiting isampm from if");
      return "AM";
    } else {
      console.log("exiting isampm from else");
      return "PM";
    }
  }
  //I want to change military time to normal time
  function displayTime(hour) {
    console.log("entering displayTime function");
    var time = hour;
    if (hour <= 12) {
      console.log("exiting displayTime function from if");
      return time;
    } else {
      console.log("exiting displayTime function from else");
      time = time - 12;
      return time;
    }
  }
  console.log(displayTime(14));

  //need to change the color according to the current time
  function isPastPresentFuture(comparedHour) {
    console.log("entering ispastpresentfuture function");
    var dayFormat = parseInt(dayjs().format("HH"));
    console.log(typeof dayFormat);
    if (comparedHour < dayFormat) {
      console.log("exiting ispastpresentfuture function from if");
      return "past";
    } else if (comparedHour > dayFormat) {
      console.log("exiting ispastpresentfuture function from else if");
      return "future";
    } else {
      console.log("exiting ispastpresentfuture function from else");
      return "present";
    }
  }
  //adding event listener on click and storing to local storage
  function clickedSaveBtn($btn, $text, hour) {
    var hourTask = hour + "-" + "task";
    $btn.on("click", function () {
      console.log("entering eventlistener function");
      console.log($text.val());
      localStorage.setItem(hourTask, $text.val());
      console.log("exiting clickSaveButton function");
    });
  }
  //a function when the page is reloaded
  function onload(hour){
    var hourTask = localStorage.getItem(hour+"-"+"task");
    console.log(hourTask);
    return hourTask;
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
