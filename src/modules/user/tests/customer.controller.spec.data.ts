export const createCustomerRequestBody = {
  name: "Test Customer2",
  email: "testCustomer2@gmail.com",
  gender: "Female",
};

export const createCustomerInvalidRequestBody = [
  {
    name: "Test Customer2",
  },
  {
    name: "Test Customer2",
  }
];

export const updateCustomerInvalidRequestBody = [
  {
    gender: "Male",
    email: "invalid@mail",
  },
];

export const updateCustomerRequestBody = {
  name: "Test Customer2",
  email: "testCustomer2@gmail.com",
};

export const expectedCustomerListResponseFromService = [
  {
    id: 1,
    name: "Saurabh Kumar",
    email: "saurabh.kumar2@tothenew.com",
    gender: "Male",
  },
  {
    id: 3,
    name: "Saurabh",
    email: "saurabh.kumar3@tothenew.com",
    gender: "Male",
  },
];

export const expectedCustomerDetailResponseFromService = {
  id: 56,
  name: "Test Customer1",
  email: "testCustomer1@gmail.com",
};
