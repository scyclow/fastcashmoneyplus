
var audioCtx, gainNode
var inited = false
function init() {
  if (inited) return false;
  inited = true;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.02;
  gainNode.connect(audioCtx.destination);
}

var oscillator;
var currentInterval;
var soundMovement = 1;

NOISE_PLAYING = false;
FREQ_CHANGE = COLOR_CHANGE;

function smoothTo(obj, ctx, value, timeInSeconds) {
  obj.exponentialRampToValueAtTime(value, ctx.currentTime + timeInSeconds)
}


var intervals = [];
function noiseInterval() {
  smoothTo(oscillator.frequency, audioCtx, 10, 0.25)

  currentInterval = setInterval(function() {
    var freq = oscillator.frequency;
    if (freq.value >= 1020) {
      soundMovement = -1;
    } else if (freq.value <= 10) {
      soundMovement = 1;
    }
    freq.value += soundMovement;
  }, FREQ_CHANGE);
  intervals.push(currentInterval);
}

var oscillators = [];
function startNoise() {
  NOISE_PLAYING = true;

  oscillator = audioCtx.createOscillator();
  oscillator.connect(gainNode);

  oscillator.type = 'square';
  oscillator.detune.value = 100;
  oscillator.frequency.value = 8000;
  oscillator.start(0);
  setTimeout(noiseInterval, 100);
  oscillators.push(oscillator);
};

function endNoise() {
  NOISE_PLAYING = false;
  oscillators.forEach(function(osc) {
    osc.stop();  // not clearing sounds fucking awesome.
  });
  intervals.forEach(clearInterval);
};

function makeNoise() {
  // if (NOISE_PLAYING) { endNoise(); }
  // else { startNoise(); }
  init()
  startNoise();
}
