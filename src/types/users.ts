export type User = {
  username: string
  email: string
  budget: number
  money_spent: number
  owe: number
  owed: number
} | null

export interface UserRegisterApi {
  username: string
  email: string
  password: string
}

export interface UserLoginApi {
  username: string
  password: string
}

export interface Friend {
  username: string
}

export type Friends = Friend[]
