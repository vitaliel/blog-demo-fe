export class Helper {
  public static merge(original, ...others) {
    for (const other of others) {
      for (const key of Object.keys(other)) {
        original[key] = other[key];
      }
    }
    return original;
  }

  public static asParams(params, path = null): any {
    const returnParams = {};
    let newPath;
    let newParams;
    if (!path && (params === undefined || params === null)) { return {}; }

    const constructor = params && params.constructor;
    if (constructor === Object) {
      for (const key of Object.keys(params)) {
        const value = params[key];
        newPath = (path ? `${path}[${key}]` : key);
        newParams = this.asParams(value, newPath);
        this.merge(returnParams, newParams);
      }
    } else {
      if (constructor === Array) {
        if (!path) { return {}; }
        newPath = (path ? `${path}[]` : '[]');
      }

      returnParams[newPath || path] = (params === null ? '' : params);
    }

    return returnParams;
  }
}
