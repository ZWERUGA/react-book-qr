import { Id } from "convex/_generated/dataModel";
// asasd
export type TBook = {
  _id: Id<"books">;
  _creationTime: number;
  authors?: string[];
  description?: string;
  identifier?: string;
  imageLink?: string;
  language?: string;
  pageCount?: number;
  publishedDate?: string;
  publisher?: string;
  title?: string;
};
