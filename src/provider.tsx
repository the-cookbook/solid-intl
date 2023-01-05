import { createComputed, createContext } from "solid-js";
import { createStore, createMutable } from "solid-js/store";
import { IntlCache, createIntl, createIntlCache } from "@formatjs/intl";
import type { IntlShape } from "@formatjs/intl";
import type { FlowComponent } from "solid-js";

import processConfig from "./process-config";
import is from "./utils/is";
import type { IntlConfig } from "./types";

const IntlContext = createContext<IntlShape>();

const IntlProvider: FlowComponent<IntlConfig> = (props) => {
  if (is.nullish(props.locale)) {
    throw new ReferenceError(
      '[solid-intl]: <IntlProvider /> expects a "locale" which was not configured. See https://formatjs.io/docs/react-intl/api#intlshape for more details',
    );
  }

  const cache = createMutable<IntlCache>(createIntlCache());
  const [intl, setIntl] = createStore(createIntl(processConfig(props), cache));

  createComputed(() => {
    setIntl(createIntl(processConfig(props), cache));
  });

  return <IntlContext.Provider value={intl}>{props.children}</IntlContext.Provider>;
};

export { IntlContext };
export default IntlProvider;
