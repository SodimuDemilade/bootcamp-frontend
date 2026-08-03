export type UpdateBootcampRequest = {
    name?: string;
    description?: string;
    website?: string;
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipcode?: string;
    careers?: string[];
    housing?: boolean;
    jobAssistance?: boolean;
    jobGuarantee?: boolean;
    acceptGi?: boolean;
    category?: string[];
}