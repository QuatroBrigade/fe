type QueryValue = string | string[] | undefined;
export class ParseFromUrl {
  /**
   *
   * @param query
   * @returns
   */
  static string(query: QueryValue) {
    return typeof query === "string" && query.trim().length > 0
      ? decodeURIComponent(query.trim())
      : null;
  }

  /**
   *
   * @param query
   * @returns
   */
  static stringOnly(query: QueryValue) {
    return ParseFromUrl.string(query) ?? "";
  }

  /**
   *
   * @param query
   * @param values
   * @returns
   */
  static stringEnum<T extends Record<string, string>>(
    query: QueryValue,
    values: T
  ): null | keyof T {
    const value = ParseFromUrl.string(query) ?? "";
    return value in values ? (value as keyof T) : null;
  }

  /**
   *
   * @param query
   * @returns
   */
  static number(query: QueryValue) {
    return typeof query === "string" ? parseInt(query.trim()) : null;
  }

  /**
   *
   *
   * @param query
   * @returns int > 0
   */
  static page(query: QueryValue) {
    return Math.max(ParseFromUrl.number(query) || 1, 1);
  }

  /**
   *
   * @param query
   * @returns
   */
  static boolean(query: QueryValue) {
    return query !== undefined;
  }

  /**
   *
   * @param query
   * @returns
   */
  static array(query: QueryValue): string[] | null {
    if (Array.isArray(query)) {
      return query;
    }
    return null;
  }

  /**
   *
   * @param query
   * @returns
   */
  static arrayOrString(query: QueryValue): string[] | null {
    const array = ParseFromUrl.array(query);
    if (array !== null) {
      return array;
    }

    const string = ParseFromUrl.string(query);
    if (string !== null) {
      return [string];
    }

    return null;
  }
}
