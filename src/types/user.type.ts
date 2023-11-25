enum Role {
  User = 0,
  Manager = 1
}

export interface User {
  _id: string
  name: string
  phone: string
  email: string
  password: string
  role: Role
  status: number
  date_of_birth?: string
  gender?: string
  theater_id?: string
  theater_name?: string
}
