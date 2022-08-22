import { Coords } from "../../abstractions/coords";
import { Utils } from "../Utils";

type Vector = Coords
type WaveOffset = Coords

export interface WaveSettings {
  readonly width: number,
  readonly height: number,
  readonly waveSteps: number,
  readonly stepHeight: number,
  readonly percentageOffset: WaveOffset
}

export interface WaveFunctionSettings {
  readonly curveFunction: (x: number) => number,
  readonly multiplier: number,
  readonly offsetX: number,
  readonly cycles: number
}

export class WaveGenerator{
  private readonly settings: WaveSettings
  private readonly offset: WaveOffset
  private readonly functionSettings: WaveFunctionSettings

  constructor(settings: WaveSettings){
    this.settings = settings;
    this.offset = this.getPxWaveOffset();

    this.functionSettings = {
      curveFunction: Math.sin,
      multiplier: 50,
      offsetX: 10,
      cycles: 10
    }
  }

  static set(settings: WaveSettings) {
    return new WaveGenerator(settings);
  }

  getPxWaveOffset(): WaveOffset {
    return {
      x: this.getPxOffset(this.settings.percentageOffset.x, this.settings.width),
      y: this.getPxOffset(this.settings.percentageOffset.y, this.settings.height)
    }
  }

  getPxOffset(percentageOffset: number, reference: number) {
    return (percentageOffset / 100) * reference;
  }

  getVectorString(vector: Vector){
    const x = vector.x;
    const y = vector.y;
    return `${x + this.offset.x},${y + this.offset.y}`
  }

  getBezierCurve(vectorStr: string, coords: Coords) {
    return `${vectorStr} ${coords.x + this.offset.x},${coords.y + this.offset.y}`
  }

  getWaveStepPath(vector: Vector, coords: Coords) {
    const vectorStr = this.getVectorString(vector)
    const bezierCurve = this.getBezierCurve(vectorStr, coords)
    return `S${bezierCurve}`
  }

  getWaveHeight(x: number) {
    const { stepHeight, width } = this.settings
    const {
      offsetX,
      cycles,
      multiplier,
      curveFunction
    } = this.functionSettings

    const yNoise = Utils.getRandomValue(
      - stepHeight / 2,
      + stepHeight / 2
    )

    const xNormalized = cycles * x / width
    const xWithOffset = xNormalized + offsetX
    const y = curveFunction(xWithOffset + Math.random() * 10) * multiplier

    return y + yNoise;
  }

  getWavePathD() {
    const stepWidth = this.settings.width / this.settings.waveSteps
    let endPoint: Coords = { x: 0, y: 0 }

    return [...Array(this.settings.waveSteps + 1)]
      .map((_, wStep) => {
        if(wStep === 0)
          return ''

        const vectorStep: Vector = {
          x: endPoint.x + stepWidth / 2,
          y: this.getWaveHeight(endPoint.x)
        }

        endPoint = {
          x: wStep * stepWidth,
          y: this.getWaveHeight(endPoint.x)
        }

        return this.getWaveStepPath(
          vectorStep,
          endPoint
        )
      })
      .join('')
  }

  getWavePathDCompleted(){
    const wave = this.getWavePathD();
    const { width } = this.settings
    const { x, y } = this.offset

    const wavePath = `M${x},${y} ${wave} L${x + width} 0 L${x} 0`;
    return wavePath
  }
}
