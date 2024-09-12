export interface User {
  username: string;
  email: string;
  password: string;
  height: number;
  weight: Weight[] | string | number;
  sex: Sex;
  activity: number;
  birthdate: Date;
  entries: Entry[];
}

export enum Sex {
  male = "male",
  female = "female",
}

export interface Entry {
  date: string | undefined;
  data: [];
  user: string;
}

export interface Weight {
  date: string;
  weight: number;
}
