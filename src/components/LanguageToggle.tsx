import useLanguage from "../hooks/useLanguage";
import Button from "./ui/Button";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      motion="pop"
      onClick={() => {
        setLanguage(language === "es" ? "en" : "es");
      }}
      className="uppercase"
    >
      {language === "es" ? "en" : "es"}
    </Button>
  );
}
