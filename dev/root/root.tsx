import { createSignal, createResource } from "solid-js";
import type { Component } from "solid-js";

import { IntlProvider } from "../../src";
import Home from "../home";

const getTranslations = (lang: string): Promise<Record<string, string>> => {
  switch (lang) {
    case "pt":
      return import("../assets/translations/pt.json").then((file) => file.default);

    case "es":
      return import("../assets/translations/es.json").then((file) => file.default);

    case "en":
    default:
      return import("../assets/translations/en.json").then((file) => file.default);
  }
};

const Root: Component = () => {
  const [lang, setLanguage] = createSignal("en");
  const [translations] = createResource<Record<string, string>, string>(lang, getTranslations, {
    initialValue: {},
  });

  const handleLangChange = (newLang: string): void => {
    setLanguage(newLang);
  };

  return (
    <IntlProvider locale={lang()} messages={translations()}>
      <Home onLangChange={handleLangChange} />
    </IntlProvider>
  );
};

export default Root;
