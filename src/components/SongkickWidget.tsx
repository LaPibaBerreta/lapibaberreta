import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const ARTIST_ID = "10171005";
const SCRIPT_ID = "songkick-widget-script";

export default function SongkickWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const oldScript = document.getElementById(SCRIPT_ID);
    if (oldScript) {
      oldScript.remove();
    }

    const anchor = document.createElement("a");
    anchor.href = `https://www.songkick.com/artists/${ARTIST_ID}`;
    anchor.className = "songkick-widget";

    anchor.dataset.theme = "dark";
    anchor.dataset.trackButton = "on";
    anchor.dataset.detectStyle = "off";
    anchor.dataset.backgroundColor = "rgb(0,0,0,1)";
    anchor.dataset.fontColor = "rgb(255,255,255,1)";
    anchor.dataset.buttonBgColor = "rgb(255,255,255,1)";
    anchor.dataset.buttonTextColor = "rgb(0,0,0,1)";
    anchor.dataset.locale = "en";
    anchor.dataset.otherArtists = "on";
    anchor.dataset.shareButton = "on";
    anchor.dataset.countryFilter = "on";
    anchor.dataset.rsvp = "on";
    anchor.dataset.requestShow = "on";
    anchor.dataset.pastEvents = "off";
    anchor.dataset.pastEventsOfftour = "off";
    anchor.dataset.remindMe = "off";
    anchor.style.display = "none";

    containerRef.current.appendChild(anchor);

    const script = document.createElement("script");
    script.src = `//widget-app.songkick.com/injector/${ARTIST_ID}`;
    script.async = true;
    script.id = SCRIPT_ID;

    document.body.appendChild(script);
  }, [location.pathname]);

  return <div ref={containerRef} className="overflow-hidden rounded-2xl" />;
}
