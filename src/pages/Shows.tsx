import SongkickWidget from "../components/SongkickWidget";
import HomeButton from "../components/HomeButton";

export default function Shows() {
  return (
    <section className="flex h-screen w-full items-center justify-center bg-violet-200/20 backdrop-blur-md">
      <div className="border-accent/20 pointer-events-auto relative min-h-117 rounded-2xl border bg-black shadow-md md:max-h-[80vh]">
        <div className="w-full rounded-2xl sm:w-250">
          <SongkickWidget />
        </div>
        <HomeButton className="absolute -top-6 -right-6" />
      </div>
    </section>
  );
}
