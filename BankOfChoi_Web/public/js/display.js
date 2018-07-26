// In the start of the display tabs, theres an 'onclick' attribute with the function
// changeMessage(event)
// 'event' is an inherit property for the html page
// Since we clicked on a tab it will pass a MouseClick event.
// Within that mouse click, there are other properties
// The one we want to focus on is target, since it will return the tag that was associated with the button click
// So we take the text element and display that on the big screen
// Uncomment the code if you want to see what gets returned, you can see it in the browser console
// #messageBox is an id for a <p> tag, so we need to use text to change the value.
function changeMessage(e){
  //console.log(e);
  //console.log(e.target);
  $("#messageBox").text(e.target.text);
}
