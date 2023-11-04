export const queries = `#graphql
    verifyGoogleToken(token: String!): String
    getUserInfo: User
    getUserInfoById(id: ID!): User
`