import { v4 as uuidv4 } from "uuid";

export const generateUniqueId = (): string => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(2); // "25"
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // "09"
  const day = now.getDate().toString().padStart(2, "0"); // "20"

  return `${year}${month}${day}-${uuidv4()}`;
};
