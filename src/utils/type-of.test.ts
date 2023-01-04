import typeOf from "./type-of";

describe("utils/type-of", () => {
  const expectations: Record<string, unknown | Array<unknown>> = {
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

  Object.entries(expectations).forEach(([type, value]) => {
    it(`should flag value type as "${type}"`, () => {
      expect(typeOf(value)).toEqual(type);
    });
  });
});
