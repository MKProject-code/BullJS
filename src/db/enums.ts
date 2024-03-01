export const Role = {
    owner: "owner",
    member: "member"
} as const;
export type Role = (typeof Role)[keyof typeof Role];
