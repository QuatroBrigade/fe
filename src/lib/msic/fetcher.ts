import { HTTPMethods } from "types/api";

/**
 *
 * @param path
 * @returns
 */
export function getApiRoute(path: string) {
  return `http://10.0.2.109${path}`;
}

type FetcherArgsType<TBody> = {
  settings?: Omit<RequestInit, "body" | "method"> & { method?: HTTPMethods };
} & (TBody extends undefined ? { body?: undefined } : { body: TBody });

/**
 *
 * @param route
 * @param options
 * @returns
 */
export async function fetcher<
  TResponse extends {},
  TBody extends {} | undefined = undefined
>(route: string, options?: FetcherArgsType<TBody>): Promise<TResponse> {
  const settings = options?.settings ?? {};
  const body = options?.body ?? null;
  const res = await fetch(route, {
    ...settings,
    headers: {
      "Content-type": "application/json",
      ...settings?.headers,
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    throw new Error("unkwnown error");
  }
  return res.json();
}
