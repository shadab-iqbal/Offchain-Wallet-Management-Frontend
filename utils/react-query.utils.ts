export const createQuery = <T extends (..._args: Parameters<T>) => ReturnType<T>>(
  queryFn: T,
  key?: string
) => {
  if (!queryFn.name && !key)
    throw new Error(
      "Make sure to provide a named function as queryFn or pass the optional key parameter"
    );
  const identifier = [...(!!queryFn.name ? [queryFn.name] : []), ...(!!key ? [key] : [])];
  return (...params: Parameters<T>) =>
    ({
      queryKey: [...identifier, JSON.stringify(params)],
      queryFn: () => queryFn(...params),
    } as const);
};
