export type User = {
    username: string,
    email: string,
} | null

export type UserRegisterApi = {
    username: string,
    email: string,
    password: string
}

export type UserLoginApi = {
    username: string,
    password: string
}

export type Friend = {
    username: string
}

export type Friends = Array<Friend>