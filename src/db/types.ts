import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { Role } from "./enums";

export type user = {
    id: string;
    created_by_id: number | null;
    updated_by_id: number | null;
    deleted_by_id: number | null;
    created_at: Timestamp | null;
    updated_at: Timestamp | null;
    deleted_at: Timestamp | null;
    firstName: string | null;
    lastName: string | null;
    role: Role | null;
};
export type DB = {
    user: user;
};
