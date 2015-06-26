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
  '$',
  '&#8363', // ₫
  '$',
  '&#165',  // ¥
  '&#8361', // ₩
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

TEXT_CHANGE = 100;//ms
var $ = document.getElementById('cash');
var len = currencySymbols.length;

function changeSymbol() {
  var i = Math.floor(Math.random() * len);
  $.innerHTML = currencySymbols[i];
};



COLOR_CHANGE = 10;//ms
var textHSV = {h: 180, s: 1, v: 1};
var backgroundHSV = {h: 0, s:1, v: 1};

var body = document.getElementsByTagName('body')[0];
var comingSoon = document.getElementById('coming-soon');

function changeColor() {
  increaseHue(textHSV);
  increaseHue(backgroundHSV);

  var text = hsvToHex(textHSV);
  body.style['color'] = text;
  comingSoon.style['border-color'] = text;
  body.style['background-color'] = hsvToHex(backgroundHSV);
}

COLOR_SWITCH = 100;
SWITCH_ACTIVE = false;

function switchColor() {
  if (!SWITCH_ACTIVE) return;

  var tmp = textHSV;
  textHSV = backgroundHSV;
  backgroundHSV = tmp;
};

function activateSwitch() {
  SWITCH_ACTIVE = !SWITCH_ACTIVE;
}
