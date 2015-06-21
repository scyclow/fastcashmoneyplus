var RGB = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'a': 10,
  'b': 11,
  'c': 12,
  'd': 13,
  'e': 14,
  'f': 15
};

var HEX = {
   0: '0',
   1: '1',
   2: '2',
   3: '3',
   4: '4',
   5: '5',
   6: '6',
   7: '7',
   8: '8',
   9: '9',
  10: 'a',
  11: 'b',
  12: 'c',
  13: 'd',
  14: 'e',
  15: 'f'
};

var colorOrder = ['r', 'g', 'b'];

// 255 => 'ff'
function cToHex(c) {
  var x = Math.floor(c / 16);
  var y = c % 16;
  return [HEX[x],HEX[y]].join('');
}

// { r:255, g:0, b:0 } => '#ff0000'
function rgbToHex(rgb) {
  var r = cToHex(rgb.r);
  var g = cToHex(rgb.g);
  var b = cToHex(rgb.b);

  return ['#',r,g,b].join('');
}

// 'ff' => 255
function hexToC(hex) {
  var x = hex[0];
  var y = hex[1];

  return (RGB[x] * 16) + RGB[y]
}
// '#ff0000' => { r:255, g:0, b:0 }
function hexToRgb(hex) {
  var r = hexToC( hex.slice(1,3) );
  var g = hexToC( hex.slice(3,5) );
  var b = hexToC( hex.slice(5,7) );

  return {r, g, b};
}

// 0.8 => 51
function getLow(saturation) {
  return Math.floor( (1 - saturation) * 255 )
};

// 0.8 => 204
function getHigh(lightness) {
  return Math.floor( lightness * 255 );
}


function dSaturation(rgb, saturation) {
  var low  = ;
  var lowest = 255;
  var lowKey
  for (var k in rgb) {
    if (rgb[k] < lowest) {
      lowest = rgb[k];
      lowKey = k;
  }
  rgb[lowKey] = low;
}

function dLightness(rgb, lightness) {
  var highest = 0;
  var highKey
  for (var k in rgb) {
    if (rgb[k] > highest) {
      lowest = rgb[k];
      lowKey = k;
  }
  rgb[lowKey] = low;
}

// dColor('#ffffff', 10, 0.9, 0.9)
function dColor(hex, step, saturation, lightness) {
  var start = Date.now();
  saturation = saturation || 1;
  lightness = lightness || 1;
  var rgb  = hexToRgb(hex);

  var colors = ['r','g','b'];
  if (step < 0) {
    colors = colors.reverse();
    step = step * -1;
  }

  for (
    var c = 0, len = colors.length;
    c < len;
    c++
  ) {
    var next = c+1 < len ? colors[c+1] : colors[0];
    var prev = c-1 >= 0  ? colors[c-1] : colors[2];
    var curr = colors[c];

    if (rgb[curr] === high) {
      if (rgb[prev] === low) {
        rgb[next] += step;

        if (rgb[next] > high) {
          var remainder = rgb[next] - high;
          rgb[next] = high;
          var outputHex = rgbToHex(rgb);
          return dColor(hex, remainder, saturation, lightness);
        }
      } else {
        rgb[prev] -= step;

        if (rgb[prev] < low) {
          var remainder = low - prev;
          rgb[low] = prev;
          var outputHex = rgbToHex(rgb);
          return dColor(hex, remainder, saturation, lightness);
        }
      }
    } 
  }

  return rgbToHex(rgb);
}
