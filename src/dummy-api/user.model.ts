export enum Role {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

export interface Hair {
  color: string
  type: string
}

export interface Address {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  coordinates: Coordinates
  country: string
}

export interface Coordinates {
  lat: number
  lng: number
}

export interface Bank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

export interface Company {
  department: string
  name: string
  title: string
  address: Address
}
export interface User {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: Hair
  ip: string
  address: Address
  macAddress: string
  university: string
  bank: Bank
  company: Company
  ein: string
  ssn: string
  userAgent: string
  crypto: Crypto
  role: Role
}

export interface UsersResponse {
  users: Array<User>
  total: number
  skip: number
  limit: number
}

export interface SuccessFetchResult {
  ok: true
  data: UsersResponse
}
export interface FailedFetchResult {
  ok: false
  message: string
}

export type FetchResult = SuccessFetchResult | FailedFetchResult
