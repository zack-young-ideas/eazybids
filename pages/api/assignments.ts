/*
The API defined in this file is for testing purposes only.

The request handler defined in this file does not retrieve
any data from a database. Instead, it simply responds with
the test data defined in the /lib/placeholder-data.ts file.
*/
import type { NextApiRequest, NextApiResponse } from "next";
import { Assignment } from '../../lib/definitions';
import assignments from '../../lib/placeholder-data';

type ApiData = {
  assignments: Assignment[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiData>,
) {
  // Artificially delay the response to simulate a real
  // server taking a few seconds to retrieve the data.
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res.status(200).json(assignments);
}
