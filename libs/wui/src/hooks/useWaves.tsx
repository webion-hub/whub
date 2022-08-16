import React, { useEffect } from 'react';
import { WavesGenerator } from '../lib/waves/WavesGenerator';

export function useWaves(color: string) {
  const [waves, setWaves] = React.useState("")

  useEffect(() => {
    const waves = setWavesGenerator().getSvgForCss()
    setWaves(waves)
  }, [])

  const setWavesGenerator = () => {
    return WavesGenerator
      .set({
        wave: {
          width: 1440,
          height: 800,
          waveSteps: 4,
          stepHeight: 100,
          percentageOffset: { x: 0, y: 0 }
        },
        color: color,
        wavesNumber: 3,
        offsetY: 0,
      })
  }

  return waves
}
