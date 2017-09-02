import Component, { tracked } from '@glimmer/component';

export default class GlimmerAudioPlayer extends Component {
  @tracked playPause = 'play';
  @tracked progress = 0.5;
  @tracked time = '4:30';
  @tracked title = 'Hopen Source - August 17, 2017';

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

}
