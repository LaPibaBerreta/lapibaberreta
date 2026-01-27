import BackgroundGlow from "./BackgoundGlow";
import Dither from "./Dither";

export default function MainBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-100 h-screen w-full opacity-65 invert saturate-50">
        <Dither
          waveColor={[0.84, 0.7, 0.6]}
          mouseRadius={0.9}
          colorNum={10}
          waveAmplitude={0.15}
          waveFrequency={5}
          waveSpeed={0.03}
          enableMouseInteraction={false}
        />
      </div>

      <BackgroundGlow />
    </>
  );
}
