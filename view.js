// TODO - redo a lot of this with generators. 

var currencySymbols = [
  '$',
  '&#165',  // ¥
  '$',
  '&#163',  // £
  '$',
  '&#8364', // €
  '&#8373', // ₵
  '$',
  '&#8364', // €
  '&#165',  // ¥
  '$',
  '&#8361', // ₩
  '&#8364', // €
  '$',
  '&#163',  // £
  '&#8369', // ₱
  '&#165',  // ¥
  '&#8377', // ₹
  '$',
  '&#163',  // £
  '$',
  '&#165',  // ¥
  '&#8364', // €
  '&#3647', // ฿
  '$',
  '&#8363', // ₫
  '$',
  '&#165',  // ¥
  '&#8361', // ₩
  '&#3647', // ฿
  '&#8373', // ₵
  '&#8364', // €
  '&#8353', // ₡
  '$',
  '&#165',  // ¥
  '&#163',  // £
  '$',
  '&#8366', // ₮
  '&#8369', // ₱
  '$',
  '&#163',  // £
  '&#8367'  //₯
];

// TODO - Symbols?
// State Object
var CHANGE_SYMBOL = true;
var SWITCH_ACTIVE = false;
var FAST_ACTIVE = false;
var CHANGE_COLOR = true;
var BUTTON_HOVER = null;

var TEXT_CHANGE = 100;
var COLOR_CHANGE = 20;
var COLOR_SWITCH = 100;
var BUTTON_SWITCH = 2000;


var $ = document.getElementById('cash');
var body = document.getElementsByTagName('body')[0];
var background = document.getElementById('background');
var callToAction = document.getElementById('call-to-action');

callToAction.onmouseover = function() { BUTTON_HOVER = true; };
callToAction.onmouseout = function() { BUTTON_HOVER = false; };

// TODO - generator
var len = currencySymbols.length;
function changeSymbol() {
  if (!CHANGE_SYMBOL) return;
  var i = Math.floor(Math.random() * len);
  $.innerHTML = currencySymbols[i];
};

var textHSV = {h: 180, s: 1, v: 1};
var bodyHSV = {h: 0, s: 1, v: 1};
var backgroundTextHSV = {h: 120, s:1, v: 1};

function changeColor() { if (!CHANGE_COLOR) return;
  increaseHue(textHSV);
  increaseHue(bodyHSV);
  increaseHue(backgroundTextHSV);

  var textColor = hsvToHex(textHSV);
  var baseColor = hsvToHex(bodyHSV);

  body.style['color'] = textColor;
  body.style['background-color'] = baseColor;

  background.style['color'] = hsvToHex(backgroundTextHSV);

  callToAction.style['border-color'] = textColor;
  callToAction.style['background-color'] = BUTTON_HOVER ? textColor : null;
  callToAction.style['color'] = BUTTON_HOVER ? baseColor : textColor;
}

function switchColor() { if (!SWITCH_ACTIVE) return;
  var tmp = textHSV;
  textHSV = bodyHSV;
  bodyHSV = tmp;
};

function fast() { if (!FAST_ACTIVE) return;
  var symbol = currencySymbols[Math.floor(Math.random() * len)];
  var symbol2 = currencySymbols[Math.floor(Math.random() * len)];
  background.innerHTML += symbol + symbol2;
};

var buttonText = [
  'Need Fast Cash?',
  'Need Cash Fast?',
  'Get Started Now!'
];

var bIx = 0;
function changeButtonText() {
  callToAction.innerHTML = SWITCH_ACTIVE ? 'COMING SOON' : buttonText[bIx];
  bIx = (bIx >= buttonText.length - 1) ? 0 : bIx + 1;
};

function activateSwitchColor() { SWITCH_ACTIVE = !SWITCH_ACTIVE; };
function activateChangeColor() { CHANGE_COLOR = !CHANGE_COLOR; };
function activateFast() { FAST_ACTIVE = !FAST_ACTIVE; };
function activateChangeSymbol() { CHANGE_SYMBOL = !CHANGE_SYMBOL;};

