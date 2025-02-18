export interface AuthBody {
    code: string,
}

export interface AuthResponse {
    token_type: string,
    access_token: string,
    expires_in: number,
    refresh_token: string
    scope: string
}