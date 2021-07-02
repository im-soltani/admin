import gql from "graphql-tag";

export const SET_TOKEN = gql`
  mutation SetToken($token: String = null) {
    setToken(token: $token) @client
  }
`;
