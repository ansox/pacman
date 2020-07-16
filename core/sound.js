
export default class Sound {
  clip;

  static musicBackground = new Sound('./sounds/music.wav');
  static hitEffect = new Sound('./sounds/hit.wav');

  constructor(name) {
    this.clip = new Audio(name);
  }

  play() {
    this.clip.currentTime = 0;
    this.clip.volume = 0.1;
    this.clip.play();
  }

  loop() {
    this.clip.loop = true;
    this.clip.currentTime = 0;
    this.clip.volume = 0.2;
    this.clip.play();
  }
}