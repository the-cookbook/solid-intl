import { useContext } from "solid-js";

import { IntlContext } from "./provider";
import type { IntlShape } from "./types";

const useIntl = (): Readonly<IntlShape> => {
  const intl = useContext<IntlShape | undefined>(IntlContext);

  if (!intl) {
    throw new ReferenceError(
      "[solid-intl]: Have you forgot to wrap your application with <IntlProvider /> ?",
    );
  }

  return intl;
};

export default useIntl;
