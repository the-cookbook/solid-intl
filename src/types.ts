import type {
  IntlShape as CoreIntlShape,
  ResolvedIntlConfig as CoreResolvedIntlConfig,
  MessageDescriptor,
} from "@formatjs/intl";
import type { JSXElement } from "solid-js";

type ResolvedIntlConfig = CoreResolvedIntlConfig<JSXElement>;

type IntlShape = CoreIntlShape<JSXElement>;

type IntlConfig = Partial<Omit<ResolvedIntlConfig, "locale" | "messages">> &
  Required<Pick<ResolvedIntlConfig, "locale" | "messages">>;

export type { IntlConfig, IntlShape, MessageDescriptor };
