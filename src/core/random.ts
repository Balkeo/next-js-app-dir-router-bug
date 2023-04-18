import { uid } from "uid";

export const randomString = (length: number): string => {
  return uid(length);
};

export const randomShortId = (): string => randomString(8);
