import { For } from "solid-js";
import type { Component } from "solid-js";

import { useIntl, defineMessages } from "../../src";
import logo from "../logo.svg";

import styles from "./App.module.css";

const messages = defineMessages({
  greeting: {
    id: "app.greeting",
    defaultMessage: "Hello, {name}!",
  },
  cta: {
    id: "app.cta",
    defaultMessage: "Change the language to see this in action!",
  },
  link: {
    id: "app.link",
    defaultMessage: "<a>Learn Solid</a> ",
  },
});

interface AppElement {
  onLangChange: (lang: string) => void;
}

const appLang: Record<string, string> = { en: "English", es: "Español", pt: "Português" };

const App: Component<AppElement> = (props) => {
  const intl = useIntl();

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>{intl.formatMessage(messages.greeting, { name: "gentleman" })}</p>
        <p>{intl.formatMessage(messages.cta)}</p>
        {intl.formatMessage(messages.link, {
          a: (str) => (
            <a
              class={styles.link}
              href="https://github.com/solidjs/solid"
              target="_blank"
              rel="noopener noreferrer"
            >
              {str}
            </a>
          ),
        })}
        <div style={{ "margin-top": "20px" }}>
          <For each={Object.keys(appLang)}>
            {(lang) => (
              <button class={styles.button} onClick={() => props.onLangChange(lang)}>
                {appLang[lang]}
              </button>
            )}
          </For>
        </div>
      </header>
    </div>
  );
};

export default App;
