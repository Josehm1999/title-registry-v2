import { NextApiResponse, NextApiRequest } from 'next';
import {
  PropertyListeds,
  listed_properties,
} from '../../../../constants/subgraphQueries';
import { graphqlClient } from '../../_app';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PropertyListeds>
) {
  const result_properties = await graphqlClient.query({
    query: listed_properties,
  });
  return res.status(200).json(result_properties.data);
}
