export type AuthState = {
    token: any | null;
    refresh_token: string;
    user: any;
}

export type LoginRes = {
    access_token: string
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
    deletedAt: string | null,
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
            active_status: string,
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

export type Subject = {
    id: number,
    subjectID: string,
    active_status: string,
    is_locked: boolean,
    created_at: string,
    updated_at: string,
    deletedAt: null,
    is_time_series_analyzed: boolean,
    time_series_updated_at: null,
    site: {
        id: number,
        siteID: string,
        name: string,
        sitePI: string,
        is_locked: boolean,
        active_status: string,
        created_at: string
        updated_at: string,
        deletedAt: null,
        totalSubjects: number
    },
    group: {
        id: number,
        name: string,
        active_status: string,
        created_at: string,
        updated_at: string
    },
    index_locations: [
        {
            id: number,
            name: string,
            category: string,
            has_NA: boolean,
            has_NA_in_vertebrae: boolean,
            vertebrae_type: string,
            active_status: string,
            created_at: string,
            updated_at: string
        },
        {
            id: number,
            name: string,
            category: string,
            has_NA: boolean,
            has_NA_in_vertebrae: boolean,
            vertebrae_type: string,
            active_status: string,
            created_at: string,
            updated_at: string
        }
    ],
    analyst: null,
    reviewers: [],
    totalVisitCount: number

    total: number,
    currentPage: number,
    totalPages: number
}

export type Login = {
    username: string
    password: string
}

export type IndexLocation = {
    id: number,
    name: string,
    category: string,
    has_NA: boolean,
    has_NA_in_vertebrae: boolean,
    vertebrae_type: string,
    active_status: string,
    created_at: string,
    updated_at: string

}

export type SubTable = {
    active_status: string,
    page: string,
    limit: string,
    level: string,
    operation: string,
    sort: string,
    sortBy: string
}

export type SubForm = {
    subjectID: string;
    group_id: number | null;
    index_location_ids: number[];
    level: string;
    operation: string;
}
export type Sub = {
    subjectID: string;
    group_id: string;
    index_location_ids: string;
    level: string;
    operation: string;
}
export type SiteForm = {
    name: string;
    siteID: string;
    sitePI: string;
    level: string;
    operation: string;
}

export type SiteTable = {
    level: string;
    operation: string;
    page: string;
    limit: string;
    sort: string;
    active_status: string;
}

export type Project = {
    project_id: string;
    name: string;
    account_name: string;
    regulated_project: boolean;
    anatomy: number | null;
    object_type_id: number | null;
    level: string;
    operation: string;
    analysis: number[];
    exam_ids: number[];
    groups: number[];
    index_locations_id: number[];
    visit_ids: number[];
}


export type HomeParam = {
    status: string;
    level: string;
    operation: string;
    limit: string;
    page: string;
}

export type ProjectDetailParam = {
    level: string;
    operation: string;
}

export type itemanatomy = {
  id: number;
  created_at: string;
  active_status: string;
  updated_at: string;
  anatomy: {
    id: number;
    name: string;
    category: string;
    active_status: string;
    created_at: string;
    updated_at: string;
  };
  projectIndexLocations: {
    id: number;
    created_at: string;
    updated_at: string;
    indexLocation: {
      id: number;
      name: string;
      category: string;
      has_NA: boolean;
      has_NA_in_vertebrae: boolean;
      vertebrae_type: string;
      active_status: string;
      created_at: string;
      updated_at: string;
    };
  }[];
};

export type ProjectIndexLocationItem = {
  id: number;
  created_at: string;
  updated_at: string;
  indexLocation: {
    id: number;
    name: string;
    category: string;
    has_NA: boolean;
    has_NA_in_vertebrae: boolean;
    vertebrae_type: string;
    active_status: string;
    created_at: string;
    updated_at: string;
  };
};

export type projectExamsItem ={
    id: number;
    created_at: string;
    updated_at: string;
    exam: {
        id: number;
        name: string;
        category: string;
        active_status: string;
        created_at: string;
        updated_at: string;
    };
    projectAnalysisTypes: [{
        id: number;
        created_at: string;
        updated_at: string;
        analysisType: {
            id: number;
            name: string;
            category: string;
            active_status: string;
            created_at: string;
            updated_at: string;
        };
    }];
}

export type projectAnalysisTypesItem={
    id: number;
    created_at: string;
    updated_at: string;
    analysisType: {
        id: number;
        name: string;
        category: string;
        active_status: string;
        created_at: string;
        updated_at: string;
    };
}

export type  visitIdsItem ={
    id: number;
    name: string;
    category: string;
    active_status: string;
    created_at: string;
    updated_at: string;
}
export type groups ={
    id: number;
    name: string;
    active_status: string;
    created_at: string;
    updated_at: string;
}
export type ItemType= {
    id: string;
    name: string;
}[]