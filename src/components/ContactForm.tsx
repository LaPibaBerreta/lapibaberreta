import { useState } from "react";
import useLanguage from "../hooks/useLanguage";
import { motion } from "motion/react";

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
    <div className="w-3/4 max-w-prose py-4 font-mono sm:w-full">
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <label className="text-base" htmlFor="name">
          {language === "es" ? "Nombre" : "Name"}
        </label>
        <input
          className="border-text rounded-xl border bg-white/40 px-2 py-1"
          type="text"
          name="name"
          required
        />

        <label className="text-base" htmlFor="email">
          E-mail
        </label>
        <input
          className="border-text rounded-xl border bg-white/40 px-2 py-1"
          type="email"
          name="email"
          required
        />

        <label className="text-base" htmlFor="message">
          {language === "es" ? "Mensaje" : "Message"}
        </label>
        <textarea
          className="border-text min-h-48 rounded-xl border bg-white/40 px-2 py-1"
          name="message"
          required
        ></textarea>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border-text mt-4 cursor-pointer self-center rounded-xl border bg-white/40 p-1 px-2"
          type="submit"
        >
          {language === "es" ? "Enviar" : "Send"}
        </motion.button>
      </form>
      <span className="text-base">{result}</span>
    </div>
  );
}
