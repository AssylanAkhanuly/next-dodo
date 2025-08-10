export const globalFetch = (relativeURL: string, init?: RequestInit) => {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${relativeURL}`, init);
};
