export type PlainObject<T = any> = Record<string, T>;

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export function isObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

export function isEqual(obj1: PlainObject, obj2: PlainObject): boolean {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (const [key, value1] of Object.entries(obj1)) {
    const value2 = obj2[key];
    if (isArray(value1) && isArray(value2)) {
      if (isEqual(value1, value2)) {
        continue;
      }
      return false;
    }
    if (isObject(value1) && isObject(value2)) {
      if (isEqual(value1, value2)) {
        continue;
      }
      return false;
    }

    if (value1 !== value2) {
      return false;
    }
  }

  return true;
}

export function cloneDeep<T extends object = object>(obj: T) {
  const result: PlainObject = obj instanceof Array ? [] : {};
  for (const [key, value] of Object.entries(obj)) {
    if (isObject(value) || isArray(value)) {
      result[key] = cloneDeep(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}
