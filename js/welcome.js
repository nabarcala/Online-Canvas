
var welcomePop = document.getElementById("welcome");
var closeBtn = document.getElementById("close-btn");
var closeBtn2 = document.getElementById("start-drawing-btn");

// Close the window on button press
closeBtn.onclick = function(){
    closeWindow();
};
closeBtn2.onclick = function(){
    closeWindow();
};

// open and close window functions
function showWindow(){
    welcomePop.style.display = 'block';
};
function closeWindow(){
    welcomePop.style.display = 'none';
};