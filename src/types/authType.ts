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

