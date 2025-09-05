export type AuthState = {
    token: any | null;
    refresh_token: string;
    user: any;
}

export type LoginRes = {
    access_token: any
    user: any,
    refresh_token: string;
}

export type Product = {
    id: number,
    project_id: string,
    name: string,
    account_name: string,
    regulated_project: boolean,
    is_locked: boolean,
    active_status: string,
    created_at: string,
    updated_at: string,
    deletedAt: any | null,
    anatomy: [
        {
            id: number,
            created_at: string,
            active_status: string,
            updated_at: string,
            anatomy: {
                id: number,
                name: string,
                category: string,
                active_status: string,
                created_at: string,
                updated_at: string
            }
        }
    ],
    totalProjectSites: number,
    totalProjectSubjects: number
}

