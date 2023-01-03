import type { IntlShape, ResolvedIntlConfig, MessageDescriptor } from "@formatjs/intl";

type IntlConfig = Partial<Omit<ResolvedIntlConfig, "locale" | "messages">> &
  Required<Pick<ResolvedIntlConfig, "locale" | "messages">>;

export type { IntlConfig, IntlShape, MessageDescriptor };
