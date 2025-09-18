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
    id: any,
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

export type group = {
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
            category: string,
            has_NA: boolean,
            has_NA_in_vertebrae: boolean,
            vertebrae_type: string,
            ctive_status: string,
            created_at: string,
            updated_at: string
        }
    ]
}

export type ProjectDetail = {
    id: number,
    project_id: string,
    name: string,
    account_name: string,
    regulated_project: boolean,
    is_locked: boolean,
    active_status: string,
    created_at: string,
    updated_at: string,
    deletedAt: null,
    visitIds: [
        {
            id: number,
            name: string,
            category: string,
            active_status: string,
            created_at: string,
            updated_at: string
        }
    ],
    projectExams: [
        {
            id: number,
            created_at: string,
            updated_at: string,
            exam: {
                id: number,
                name: string,
                category: string,
                active_status: string,
                created_at: string,
                updated_at: string
            },
            projectAnalysisTypes: [
                {
                    id: number,
                    created_at: string,
                    updated_at: string,
                    analysisType: {
                        id: number,
                        name: string,
                        category: string,
                        active_status: string,
                        created_at: string,
                        updated_at: string
                    }
                }
            ]
        }
    ],
    objectType: {
        id: string,
        name: string,
        active_status: string,
        created_at: string,
        updated_at: string
    },
    groups: [
        {
            id: number,
            name: string,
            active_status: string,
            created_at: string,
            updated_at: string
        }
    ],
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
            },
            projectIndexLocations: [
                {
                    id: number,
                    created_at: string,
                    updated_at: string,
                    indexLocation: {
                        id: number,
                        name: string,
                        category: string,
                        has_NA: boolean,
                        has_NA_in_vertebrae: boolean,
                        vertebrae_type: string,
                        active_status: string,
                        created_at: string,
                        updated_at: string,
                    }
                }
            ]
        }
    ],
    totalProjectSites: number,
    totalProjectSubjects: number
}



export type Site = {
    id: number,
    siteID: string,
    name: string,
    sitePI: null,
    is_locked: boolean,
    active_status: string,
    created_at: string,
    updated_at: string,
    deletedAt: null,
    totalSubjects: number,
    project_id: number
}


export type SiteForm ={
    siteID: string,
    name: string,
    sitePI: string,
    created_by: {
        id: number,
        first_name: string,
        last_name: string,
        email: string,
        user_sub_id: string,
        phone: string,
        lastSignedInAt: string,
        active_status:string,
        created_at:string,
        updated_at: string,
        deletedAt: null,
        userRoles: [
            {
                id: number,
                assignedAt: string,
                created_at: string,
                updated_at: string,
                role: {
                    id: number,
                    name: string,
                    description: string,
                    active_status: string,
                    created_at: string,
                    updated_at: string
                }
            }
        ]
    },
    project: {
        id: number,
        project_id: string,
        name: string,
        account_name: string,
        regulated_project: boolean,
        is_locked: boolean,
        active_status: string,
        created_at: string,
        updated_at: string,
        deletedAt: null
    },
    id: number,
    s_locked: boolean,
    active_status: string,
    created_at: string,
    updated_at: string,
    deletedAt: null
}