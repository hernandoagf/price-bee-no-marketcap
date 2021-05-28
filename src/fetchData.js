const gql = require('graphql-tag')
const { GraphQLWrapper } = require('@aragon/connect-thegraph')
const dotenv = require('dotenv')

dotenv.config()

const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/1hive/honeyswap-xdai'

const PRICE_QUERY = gql`
  query {
    pair(id: "${process.env.PAIR_ID}") {
      token1Price
      token1 {
        symbol
      }
    }
  }
`

const fetchData = async () => {
  const graphqlClient = new GraphQLWrapper(SUBGRAPH_URL)
  const result = await graphqlClient.performQuery(PRICE_QUERY)

  if (!result.data) return undefined
  return result
}

exports.getTokenPrice = async () => {
  const res = await fetchData()
  const price = parseFloat(res.data.pair.token1Price).toFixed(2)
  return price
}

exports.getTokenSymbol = async () => {
  const res = await fetchData()
  return res.data.pair.token1.symbol
}
