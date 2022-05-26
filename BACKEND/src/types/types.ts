export interface User {
  username: String,
  email: String,
  password: String,
  height: Number,
  weight: Number,
  gender: Gender,
  activity: Number
}


enum Gender {
  male = 'male',
  female = 'female'
}