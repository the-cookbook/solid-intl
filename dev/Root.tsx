import { createSignal } from "solid-js";
import type { Component } from "solid-js";

import { IntlProvider } from "../src";
import en from "./translations/en.json";
import es from "./translations/es.json";
import pt from "./translations/pt.json";

import App from "./app";

const getTranslation = (lang: string): Record<string, string> => {
  switch (lang) {
    case "pt":
      return pt;

    case "es":
      return es;

    case "en":
    default:
      return en;
  }
};
const Root: Component = () => {
  const [lang, setLanguage] = createSignal("es");

  const handleLangChange = (newLang: string): void => {
    setLanguage(newLang);
  };

  return (
    <IntlProvider locale={lang()} messages={getTranslation(lang())}>
      <App onLangChange={handleLangChange} />
    </IntlProvider>
  );
};

export default Root;
