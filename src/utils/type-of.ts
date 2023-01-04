const typeOf = (value: unknown | unknown[]): string =>
  ({}.toString
    .call(value)
    .match(/\s([A-Za-z]+)/)?.[1]
    .toLowerCase() ?? "");

export default typeOf;
