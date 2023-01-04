import is from "./is";

const base = {
  string: "string",
  number: 1,
  boolean: true,
  object: {},
  array: [],
  function: (): null => null,
  date: new Date(),
  map: new Map(),
  set: new Set(),
  regexp: /a/,
  null: null,
  undefined,
};

const mountDataTypeExpectation = (
  expectation: boolean,
  ...dataTypes: Array<keyof typeof base>
): Record<string, [dataType: unknown | Array<unknown>, result: boolean]> => {
  return Object.entries(base).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: [value, dataTypes.includes(key as keyof typeof base) ? expectation : !expectation],
    }),
    {},
  );
};

describe("utils/is", () => {
  describe("nullish()", () => {
    const expectations = mountDataTypeExpectation(true, "null", "undefined");

    Object.entries(expectations).forEach(([type, [dataType, result]]) => {
      it(`should flag "${type}" correctly`, () => {
        expect(is.nullish(dataType)).toBe(result);
      });
    });
  });

  describe("string()", () => {
    const expectations = mountDataTypeExpectation(true, "string");

    Object.entries(expectations).forEach(([type, [dataType, result]]) => {
      it(`should flag "${type}" correctly`, () => {
        expect(is.string(dataType)).toBe(result);
      });
    });
  });

  describe("number()", () => {
    const expectations = mountDataTypeExpectation(true, "number");

    Object.entries(expectations).forEach(([type, [dataType, result]]) => {
      it(`should flag "${type}" correctly`, () => {
        expect(is.number(dataType)).toBe(result);
      });
    });
  });

  describe("bool()", () => {
    const expectations = mountDataTypeExpectation(true, "boolean");

    Object.entries(expectations).forEach(([type, [dataType, result]]) => {
      it(`should flag "${type}" correctly`, () => {
        expect(is.bool(dataType)).toBe(result);
      });
    });
  });

  describe("object()", () => {
    const expectations = mountDataTypeExpectation(true, "object");

    Object.entries(expectations).forEach(([type, [dataType, result]]) => {
      it(`should flag "${type}" correctly`, () => {
        expect(is.object(dataType)).toBe(result);
      });
    });
  });

  describe("array()", () => {
    const expectations = mountDataTypeExpectation(true, "array");

    Object.entries(expectations).forEach(([type, [dataType, result]]) => {
      it(`should flag "${type}" correctly`, () => {
        expect(is.array(dataType)).toBe(result);
      });
    });
  });

  describe("date()", () => {
    const expectations = mountDataTypeExpectation(true, "date");

    Object.entries(expectations).forEach(([type, [dataType, result]]) => {
      it(`should flag "${type}" correctly`, () => {
        expect(is.date(dataType)).toBe(result);
      });
    });
  });

  describe("function()", () => {
    const expectations = mountDataTypeExpectation(true, "function");

    Object.entries(expectations).forEach(([type, [dataType, result]]) => {
      it(`should flag "${type}" correctly`, () => {
        expect(is.function(dataType)).toBe(result);
      });
    });
  });
});
