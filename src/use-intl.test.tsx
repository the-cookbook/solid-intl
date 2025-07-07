import { describe, it, expect } from "vitest";
import { screen, render } from "@solidjs/testing-library";
import type { VoidComponent } from "solid-js";

import IntlProvider from "../src/provider";
import useIntl from "../src/use-intl";

const en = {
  "app.greeting": "Welcome back!",
};

const es = {
  "app.greeting": "¡Bienvenido de nuevo!",
};

interface FooElement {
  defaultMessage?: string;
}

const Foo: VoidComponent<FooElement> = (props) => {
  const intl = useIntl();

  return (
    <div>
      {intl.formatMessage({
        id: "app.greeting",
        defaultMessage: props.defaultMessage ?? "",
      })}
    </div>
  );
};

describe("useIntl()", () => {
  describe("exceptions", () => {
    it("should throw when context is missing", async () => {
      expect(() => render(() => <Foo />)).toThrow(
        "Have you forgot to wrap your application with <IntlProvider />",
      );
    });

    it("should not throw when setup correctly", () => {
      expect(() =>
        render(() => (
          <IntlProvider locale="en" messages={en}>
            <Foo />
          </IntlProvider>
        )),
      ).not.toThrow();
    });
  });

  describe("behaviour", () => {
    it("should translate locale accordingly", () => {
      render(() => (
        <IntlProvider locale="en" messages={en}>
          <Foo />
        </IntlProvider>
      ));

      expect(screen.getByText(en["app.greeting"])).toBeInTheDocument();
    });

    it("should fallback to defaultMessage when translation is missing", () => {
      const defaultMessage = "It's nice to you again!";

      render(() => (
        <IntlProvider locale="en" messages={{}}>
          <Foo defaultMessage={defaultMessage} />
        </IntlProvider>
      ));

      expect(screen.getByText(defaultMessage)).toBeInTheDocument();
    });

    it("should re-translate locale when language changes", () => {
      render(() => (
        <IntlProvider locale="en" messages={en}>
          <Foo />
        </IntlProvider>
      ));

      expect(screen.getByText(en["app.greeting"])).toBeInTheDocument();

      render(() => (
        <IntlProvider locale="en" messages={es}>
          <Foo />
        </IntlProvider>
      ));

      expect(screen.getByText(es["app.greeting"])).toBeInTheDocument();
    });

    it("should format messages with defaultRichTextElements specified", () => {
      render(() => (
        <IntlProvider
          locale="en"
          messages={{ "app.greeting": "My <bar>message</bar> formatted." }}
          defaultRichTextElements={{ bar: (chunks) => <span data-testid="bar">{chunks}</span> }}
        >
          <Foo />
        </IntlProvider>
      ));

      expect(screen.getAllByTestId("bar")).toHaveLength(1);
    });
  });
});
