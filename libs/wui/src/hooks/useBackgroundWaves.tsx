import { useWaves } from "./useWaves";

export function useBackgroundWaves(color: string): React.CSSProperties {
  const waves = useWaves(color)

  return {
    background: 'transparent',
    backgroundImage: `url("${waves}")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };
}
