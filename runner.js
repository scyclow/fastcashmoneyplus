
comingSoon.onclick = activateSwitch;

document.addEventListener("DOMContentLoaded", function() {
  setInterval(changeSymbol, TEXT_CHANGE);
  setInterval(fast, COLOR_CHANGE);
  setInterval(changeColor, COLOR_CHANGE);
  setInterval(switchColor, COLOR_SWITCH);
});