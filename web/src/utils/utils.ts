export const invert = <T, S>(m: Map<T, S>): Map<S, T> => new Map(
  Array.from(m.entries()).map(([k, v]) => ([v, k])),
);
