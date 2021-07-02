export default {
  Query: {
    isLoggedIn: (_, {}, { getCacheKey }) =>
      getCacheKey({ __typename: "IsLoggedIn" })
  },
  Mutation: {
    setToken: (_, { token }, { cache }) => {
      localStorage.setItem("token-admin", token);
      cache.writeData({
        data: {
          isLoggedIn: {
            __typename: "IsLoggedIn",
            isLoggedIn: !!token
          }
        }
      });
      return null;
    }
  }
};
