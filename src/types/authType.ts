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

export type productForm = {
    project_id: string,
    name: string,
    account_name: string,
    regulated_project: boolean,
    anatomy: [],
    index_locations_id: [],
    object_type_id: [],
    groups: [],
    level: string,
    operation: string,
    exam_ids: [],
    analysis: [],
    visit_ids: []

}

export type visit = {
    id: number,
    name: string,
    category: string,
    active_status: string,
    created_at: string,
    updated_at: string
}

export type exam = {
    id: number,
    name: string,
    category: string,
    active_status: string,
    created_at: string,
    updated_at: string
}

export type group= {
    id: number,
    name: string,
    active_status: string,
    created_at: string,
    updated_at: string
}

export type analysis = {
    id: number,
    name: string,
    category: string,
    active_status: string,
    created_at: string,
    updated_at: string
}
export type objectt = {
    id?: number,
    name: string,
    active_status: string,
    created_at: string,
    updated_at: string
}

export type anatomies = {
    id: number,
    name: string,
    category: string,
    active_status: string,
    created_at: string,
    updated_at: string,
    indexLocations: [
                {
                    id: number,
                    name: string,
                    category:string,
                    has_NA: boolean,
                    has_NA_in_vertebrae: boolean,
                    vertebrae_type: string,
                    ctive_status: string,
                    created_at: string,
                    updated_at: string
                }
            ]
}


