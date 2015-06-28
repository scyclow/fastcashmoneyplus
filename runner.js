
callToAction.onclick = function() {
  activateSwitchColor();
  activateFast();
  makeNoise();
};

document.addEventListener("DOMContentLoaded", function() {
  changeButtonText();

  setInterval(changeButtonText, BUTTON_SWITCH);
  setInterval(changeSymbol, TEXT_CHANGE);
  setInterval(fast, COLOR_CHANGE);
  setInterval(changeColor, COLOR_CHANGE);
  setInterval(switchColor, COLOR_SWITCH);
});

window.onkeydown = function(e){
  if (e.keyCode === 32) { } // spacebar
  if (e.keyCode === 67) { activateSwitchColor(); } // c
  if (e.keyCode === 86) { activateChangeColor(); } // v
  if (e.keyCode === 66) { activateFast(); } // b
  if (e.keyCode === 78) { activateChangeSymbol(); } // n
  if (e.keyCode === 77) { endNoise(); } // m
};