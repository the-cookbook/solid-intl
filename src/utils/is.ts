import typeOf from "./type-of";

type Nullish = null | undefined;

const is = {
  // @ts-ignore
  nullish<T>(value: T): value is Nullish {
    return value === null || value === undefined;
  },
  // @ts-ignore
  string<T>(value: T): value is string {
    return typeOf(value) === "string";
  },
  // @ts-ignore
  number<T>(value: T): value is number {
    return typeOf(value) === "number";
  },
  // @ts-ignore
  bool<T>(value: T): value is boolean {
    return typeOf(value) === "boolean";
  },
  // @ts-ignore
  object<T>(value: T): value is object {
    return typeOf(value) === "object";
  },
  // @ts-ignore
  array<T>(value: T): value is Array<any> {
    return Array.isArray(value);
  },
  // @ts-ignore
  date<T>(value: T): value is Date {
    return typeOf(value) === "date";
  },
  // @ts-ignore
  function<T>(value: T): value is Function {
    return typeOf(value) === "function";
  },
};

export default is;
