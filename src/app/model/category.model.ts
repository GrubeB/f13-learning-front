export class Category {
    id!: string;
    name?: string;
    description? : string;
    status?: CategoryStatus;
    parents?: Category[];
    children?: Category[];
}

export enum CategoryStatus {
    UNVERIFIED,
    VERIFIED
}