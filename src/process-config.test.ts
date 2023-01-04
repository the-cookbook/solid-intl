import { describe, it, expect } from "vitest";
import { DEFAULT_INTL_CONFIG } from "@formatjs/intl";

import processConfig from "../src/process-config";

describe("processConfig()", () => {
  it("should contain defaults", () => {
    // @ts-ignore
    const config = processConfig({});

    expect(
      Object.keys(config).every(
        (key) =>
          DEFAULT_INTL_CONFIG[key as keyof typeof DEFAULT_INTL_CONFIG] ===
          config[key as keyof typeof DEFAULT_INTL_CONFIG],
      ),
    ).toBe(true);
  });

  it("should have custom settings", () => {
    const locale = "it";
    const messages = { "app.title": "hello world" };
    const config = processConfig({ locale, messages });

    expect(config.locale === locale).toBe(true);
    expect(config.messages).toEqual(messages);
  });
});
