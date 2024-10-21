/* eslint-disable @typescript-eslint/no-explicit-any */
export const isObjectCompleted = (
  obj: Record<string, any>,
  fields: string[]
) => {
  return fields.every((field) => {
    const value = obj[field];
    return value !== "" && value !== 0 && value !== null && value !== undefined;
  });
};
