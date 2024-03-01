import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { Role } from "./enums";

export type Book = {
    id: string;
    authorId: string;
    title: string;
};
export type User = {
    id: string;
    name: string | null;
    email: string | null;
    password: string | null;
    role: Role | null;
};
export type DB = {
    Book: Book;
    User: User;
};
