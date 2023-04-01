enum Gender{
  'Male',
  'Female',
  'Other'
}

export interface ICreateCustomer {
  id?: number;
  name: string;
  email: string;
  gender: Gender;
}

export interface ICustomer {
  id: number;
  name: string;
  email: string;
  gender: Gender;
}
