import SongkickWidget from "../components/SongkickWidget";
import HomeButton from "../components/HomeButton";

export default function Shows() {
  return (
    <section className="flex h-screen w-full items-center justify-center bg-violet-200/20 backdrop-blur-md">
      <div className="border-accent/20 _bg-violet-200/20 _sm:px-3 _min-h-1/3 _h-screen _min-w-1/2 _sm:w-3/4 _w-full pointer-events-auto relative rounded-2xl border bg-white/50 shadow-md md:max-h-[80vh]">
        <div className="w-full rounded-2xl sm:w-250">
          <SongkickWidget />
        </div>
        <HomeButton className="absolute -top-6 -right-6" />
      </div>
    </section>
  );
}
