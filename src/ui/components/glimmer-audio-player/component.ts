import Component, { tracked } from '@glimmer/component';

interface Audio {
  play();
  pause();
  load();
  duration:number;
  addEventListener(name:string,fn:any,useCapture:boolean);
}

interface Element {
  querySelector(selector:string): Audio;
}

export default class GlimmerAudioPlayer extends Component {
  @tracked isPlaying = false;
  @tracked progress = 0.5;
  @tracked time = '4:30';
  @tracked duration = 0;
  @tracked title = 'Hurry Up and Ember';
  @tracked preload = 'auto';
  @tracked fileUrl = 'https://emberweekend.s3.amazonaws.com/ep-114-ember-weekend.mp3';
  @tracked audio: Audio;
  @tracked canPlay = false;
  @tracked autoPlay = null;
  @tracked hasAutoPlayed = false;

  didInsertElement() {
    this.audio = this.element.querySelector('[data-id=audio]');
    window.audio = this.audio;
    this.audio.addEventListener('loadedmetadata', this.onMetaData.bind(this), false);
    this.audio.addEventListener('canplay', this.onCanPlay.bind(this), false);
    this.audio.addEventListener('playing', this.onPlaying.bind(this), false);
    this.audio.addEventListener('pause', this.onPaused.bind(this), false);
    this.audio.addEventListener('ended', this.onEnded.bind(this), false);
    this.audio.addEventListener('error', this.onError.bind(this), false);
  }

  @tracked('progress')
  get progressStyle() {
    return `transform: scaleX(${this.progress});`;
  }

  @tracked('progress')
  get progressWhiteStyle() {
    return `width: ${this.progress * 100}%;`;
  }

  @tracked('progress')
  get titleStyle() {
    return `width: ${1/this.progress * 100}%;`;
  }

  playPause(e) {
    if (this.canPlay) {
      if (this.isPlaying) {
        console.log('pause');
        this.audio.pause();
      } else {
        console.log('play');
        this.audio.play();
        this.audio.play();
      }
    } else {
      console.log('load');
      this.audio.load();
    }
  }

  onMetaData(e) {
    console.log('onMetaData');
    this.duration = this.audio.duration;
  }

  onCanPlay(e) {
    console.log('onCanPlay');
    console.log(e.eventPhase);
    if (!this.canPlay) {
      this.canPlay = true;
    }
    if (this.autoPlay && !this.hasAutoPlayed) {
      console.log('autoPlay');
      this.audio.play();
    }
  }

  onPlaying(e) {
    console.log('onPlaying');
    if (!this.isPlaying) {
      console.log('set isPlaying true');
      this.isPlaying = true;
      this.startProgressTimer();
    }
  }

  startProgressTimer() {
    setInterval(() => {
      console.log('update');
      this.duration = this.audio.duration;
      this.currentTime = this.audio.currentTime;
      this.timeLeft = this.duration - this.currentTime;
      this.progress = this.currentTime / this.duration;
    }. 60);
  }

  onPaused(e) {
    console.log('onPaused');
    if (this.isPlaying) {
      this.isPlaying = false;
    }
  }

  onEnded(e) {
    if (this.isPlaying) {
      this.isPlaying = false;
    }
  }

  onError(e) {
    if (this.isPlaying) {
      this.isPlaying = false;
    }
  }

}
