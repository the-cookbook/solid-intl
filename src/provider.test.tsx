import { describe, it, expect } from "vitest";
import { screen, render } from "solid-testing-library";

import IntlProvider from "../src/provider";

const en = {
  "app.greeting": "Welcome back!",
};

const es = {
  "app.greeting": "¡Bienvenido de nuevo!",
};
describe("<IntlProvider />", () => {
  describe("exceptions", () => {
    it("should not throw when required props are correctly setup", () => {
      expect(() =>
        render(() => (
          <IntlProvider locale="en" messages={en}>
            <div>lorem ipsum</div>
          </IntlProvider>
        )),
      ).not.toThrow();
    });

    it("should not throw when locale is missing", () => {
      expect(() =>
        render(() => (
          // @ts-ignore
          <IntlProvider messages={{}}>
            <div>lorem ipsum</div>
          </IntlProvider>
        )),
      ).toThrow("locale");
    });
  });

  describe("behaviour", () => {
    it("should render children", () => {
      const text = "lorem ipsum";

      render(() => (
        <IntlProvider locale="en" messages={en}>
          <div>{text}</div>
        </IntlProvider>
      ));

      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
