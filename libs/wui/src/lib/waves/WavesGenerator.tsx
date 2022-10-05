import { alpha } from '@mui/material';
import { Utils } from '../Utils';
import { WaveGenerator, WaveSettings } from './WaveGenerator';

interface WavesSettings {
  readonly wave: WaveSettings;
  readonly wavesNumber: number;
  readonly offsetY: number;
  readonly color: string;
}

export class WavesGenerator {
  private readonly settings: WaveSettings;
  private readonly wavesNumber: number;
  private readonly color: string;
  private readonly offsetY: number;

  constructor(settings: WavesSettings) {
    this.settings = settings.wave;
    this.wavesNumber = settings.wavesNumber;
    this.color = settings.color;
    this.offsetY = settings.offsetY;
  }

  static set(settings: WavesSettings) {
    return new WavesGenerator(settings);
  }

  getWave(yPos: number) {
    return WaveGenerator.set({
      ...this.settings,
      percentageOffset: { x: 0, y: yPos },
    }).getWavePathDCompleted();
  }

  getColor(index: number) {
    const colorStep = 1 / this.wavesNumber;
    const colorOpacity = colorStep * (index + 1);
    const color = alpha(this.color, colorOpacity);
    return color.replace('#', '%23');
  }

  getOffsetY(index: number) {
    const offsetStep = 100 / (this.wavesNumber + 1);
    const wavePosition = index * offsetStep;
    const yOffsetNoise = Utils.getRandomValue(
      -offsetStep / 16,
      offsetStep / 16
    );
    return 100 - wavePosition + yOffsetNoise + this.offsetY - offsetStep;
  }

  getWavePath(index: number) {
    const offsetY = this.getOffsetY(index);
    const color = this.getColor(index);

    const wave = this.getWave(offsetY);

    return (
      <path
        key={index}
        d={wave}
        fill={color}
        style={{
          transition: '4s',
        }}
      />
    );
  }

  getSvg() {
    return (
      <svg viewBox={`0 0 ${this.settings.width} ${this.settings.height}`}>
        {[...Array(this.wavesNumber)].map((e, index) =>
          this.getWavePath(index)
        )}
      </svg>
    );
  }

  getWavePathForCss(index: number) {
    const offsetY = this.getOffsetY(index);
    const color = this.getColor(index);

    const wave = this.getWave(offsetY);

    return `%3E%3Cpath d='${wave}' fill='${color}' style='transition: all 0.25s ease-in-out 0s;'%3E%3C/path`;
  }

  getSvgForCss() {
    const waves = [...Array(this.wavesNumber)]
      .map((_, i) => this.getWavePathForCss(i))
      .join('');

    const { width, height } = this.settings;

    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'${waves}%3E%3C/svg%3E`;
  }
}
