export const HTTPMethods = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
  PATCH: "PATCH",
} as const;

export type HTTPMethods = keyof typeof HTTPMethods;
