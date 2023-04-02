type QueryValue = string | string[] | undefined;
export class FromUrl {
  static string(query: QueryValue) {
    return typeof query === "string" && query.trim().length > 0
      ? decodeURIComponent(query.trim())
      : null;
  }

  static number(query: QueryValue) {
    return typeof query === "string" ? parseInt(query.trim()) : null;
  }
}
