import { Friends } from './users'

export interface Transaction {
  id: number
  amount: number
  date: string
  name: string
  category: string
  involved_users: Friends
  non_members: string
}

export type TransactionCreateApi = Pick<Transaction, 'amount' | 'name' | 'category' | 'involved_users' | 'non_members'>
