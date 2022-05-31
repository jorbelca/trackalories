export interface User {
  username: String,
  email: String,
  password: String,
  height: Number,
  weight: Number,
  sex: Sex,
  activity: Number,
  birthdate: Date
}


export enum Sex {
  male = 'male',
  female = 'female'
}

export interface Entry {
  date: Date,
  data: []
}