var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var gainNode = audioCtx.createGain();
gainNode.gain.value = 0.02;
gainNode.connect(audioCtx.destination);
var oscillator;
var currentInterval;
var soundMovement = 1;

NOISE_PLAYING = false;
FREQ_CHANGE = COLOR_CHANGE;

function noiseInterval() {
  oscillator.frequency.value = 0; // value in hertz
  currentInterval = setInterval(function() {
    var freq = oscillator.frequency;
    if (freq.value >= 1020) {
      soundMovement = -1;
    } else if (freq.value <= 10) {
      soundMovement = 1;
    }
    freq.value += soundMovement;
  }, FREQ_CHANGE);
}

function startNoise() {
  NOISE_PLAYING = true;

  oscillator = audioCtx.createOscillator();

  oscillator.connect(gainNode);

  oscillator.type = 'square';
  oscillator.detune.value = 100;
  oscillator.frequency.value = 8000;
  oscillator.start(0);
  setTimeout(noiseInterval, 100);
};

function endNoise() {
  NOISE_PLAYING = false;
  clearInterval(currentInterval);
  //oscillator.stop();  // not clearing sounds fucking awesome.
};

function makeNoise() {
  if (NOISE_PLAYING) { endNoise(); }
  else { startNoise(); }
}