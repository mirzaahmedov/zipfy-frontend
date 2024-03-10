import { ZodError } from "zod";

export function getErrorObject<T extends Record<string, string>>(
  error: ZodError<T>,
): Partial<T> {
  const errorObject: Record<string, string> = {};

  error.errors.forEach((e) => {
    errorObject[e.path[0]] = e.message;
  });

  return errorObject as Partial<T>;
}
