// 255 => 'ff'
function cToHex(c) {
  var hex = Math.round(c).toString(16);
  return (hex.length === 1) ? '0' + hex : hex;
};

// { r:255, g:0, b:0 } => '#ff0000'
function rgbToHex(rgb) {
  var r = cToHex(rgb.r);
  var g = cToHex(rgb.g);
  var b = cToHex(rgb.b);

  return ['#', r, g, b].join('');
};

// 'ff' => 255
function hexToC(hex) {
  return parseInt(hex, 16);
};
// '#ff0000' => { r:255, g:0, b:0 }
function hexToRgb(hex) {
  var r = hexToC( hex.slice(1, 3) );
  var g = hexToC( hex.slice(3, 5) );
  var b = hexToC( hex.slice(5, 7) );

  return {r: r, g: g, b: b};
};

// http://www.rapidtables.com/convert/color/rgb-to-hsv.htm
// {r: 255, g: 0, b: 255} => {h: 100, s: 1, v: 1}
function rgbToHsv(rgb) {
  var r = rgb.r / 255;
  var g = rgb.g / 255;
  var b = rgb.b / 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var diff = max - min;
  var value = max;
  var saturation = max ? diff / max : 0;

  var hue;
  if (!diff) {
    hue = 0;

  // For some reason website says "mod 6". This returns wonky
  // values, while + 6 appears to return the correct values.
  } else if (r === max) {
    hue = ((g - b) / diff) + 6;

  } else if (g === max) {
    hue = ((b - r) / diff) + 2;

  } else if (b === max) {
    hue = ((r - g) / diff) + 4;
  }

  hue *= 60;

  return {h: hue, s: saturation, v: value};
};

function hsvToRgb(hsv) {
  var c = hsv.v * hsv.s;
  var h = hsv.h / 60;
  var x = c * (1 - Math.abs(h % 2 - 1))
  var m = hsv.v - c;

  var r, g, b;
  switch( Math.floor(h) ) {
    case 0:
    case 6:
      r = c; g = x; b = 0; break;
    case 1:
      r = x; g = c; b = 0; break;
    case 2:
      r = 0; g = c; b = x; break;
    case 3:
      r = 0; g = x; b = c; break;
    case 4:
      r = x; g = 0; b = c; break;
    case 5:
      r = c; g = 0; b = x; break;
  };

  return {
    r: (r + m) * 255,
    g: (g + m) * 255,
    b: (b + m) * 255,
  };
};

function hsvToHex(hsv) {
  var rgb = hsvToRgb(hsv);
  return rgbToHex(rgb);
};

function increaseHue(hsv) {
  hsv.h += 1;
  if (hsv.h > 360) { hsv.h = 0; }
};
