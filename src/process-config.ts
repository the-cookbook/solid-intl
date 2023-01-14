import { mergeProps } from "solid-js";
import { DEFAULT_INTL_CONFIG } from "@formatjs/intl";

import type { IntlConfig } from "./types";

function processConfig<T extends IntlConfig = IntlConfig>(config: T): Readonly<IntlConfig> {
  return mergeProps(DEFAULT_INTL_CONFIG, {
    locale: config.locale,
    timeZone: config.timeZone,
    fallbackOnEmptyString: config.fallbackOnEmptyString,
    formats: config.formats,
    messages: config.messages,
    defaultLocale: config.defaultLocale,
    defaultFormats: config.defaultFormats,
    defaultRichTextElements: config.defaultRichTextElements,
    onError: config.onError,
    onWarn: config.onWarn,
  });
}

export type { IntlConfig };

export default processConfig;
