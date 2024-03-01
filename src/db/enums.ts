export const Role = {
    OWNER: "OWNER",
    MEMBER: "MEMBER"
} as const;
export type Role = (typeof Role)[keyof typeof Role];
