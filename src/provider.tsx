import { createEffect, createContext, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { IntlCache, createIntl, createIntlCache } from "@formatjs/intl";
import type { IntlShape } from "@formatjs/intl";
import type { FlowComponent } from "solid-js";

import processConfig from "./process-config";
import type { IntlConfig } from "./types";

const IntlContext = createContext<IntlShape>();

const IntlProvider: FlowComponent<IntlConfig> = (props) => {
  const [cache] = createSignal<IntlCache>(createIntlCache());
  const [intl, setIntl] = createStore(createIntl(processConfig(props), cache()));

  createEffect(() => {
    setIntl(createIntl(processConfig(props), cache()));
  });

  return <IntlContext.Provider value={intl}>{props.children}</IntlContext.Provider>;
};

export { IntlContext };
export default IntlProvider;
