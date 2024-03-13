const mockData = [
  {
    authorized_cap: 3000000,

    paidup_capital: 147500,

    registered_state: "Lakshadweep",
  },
];

export default {
  get: jest.fn().mockResolvedValue(mockData),
};
