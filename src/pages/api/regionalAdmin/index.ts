import { ApolloQueryResult } from '@apollo/client';
import { NextApiResponse, NextApiRequest } from 'next';
import {
  RegionalAdmins,
  regional_admins,
} from '../../../../constants/subgraphQueries';
import { graphqlClient } from '../../_app';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<RegionalAdmins>
) {
  const result_admins = await graphqlClient.query({ query: regional_admins });
  return res.status(200).json(result_admins.data);
}
