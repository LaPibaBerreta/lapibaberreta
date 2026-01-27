import { useState } from "react";
import useLanguage from "../hooks/useLanguage";

export default function ContactForm() {
  const [result, setResult] = useState("");
  const { language } = useLanguage();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    formData.append("access_key", "16415d0b-0284-493a-9c76-5029dd9501e8");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data: { success: boolean; message?: string } = await response.json();

    if (data.success) {
      setResult("mensaje enviado!");
      form.reset();
    } else {
      console.log("error", data);
      setResult(data.message ?? "Error");
    }
  };

  return (
    <div className="w-3/4 max-w-prose py-8 sm:w-full">
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <label className="text-base" htmlFor="name">
          {language === "es" ? "Nombre" : "Name"}
        </label>
        <input
          className="border-text bg-background border px-2 py-1"
          type="text"
          name="name"
          required
        />

        <label className="text-base" htmlFor="email">
          E-mail
        </label>
        <input
          className="border-text bg-background border px-2 py-1"
          type="email"
          name="email"
          required
        />

        <label className="text-base" htmlFor="message">
          {language === "es" ? "Mensaje" : "Message"}
        </label>
        <textarea
          className="border-text bg-background min-h-48 border px-2 py-1"
          name="message"
          required
        ></textarea>

        <button
          className="border-text bg-text text-background hover:border-accent hover:bg-accent mt-4 border p-1"
          type="submit"
        >
          {language === "es" ? "Enviar" : "Send"}
        </button>
      </form>
      <span className="text-base">{result}</span>
    </div>
  );
}
