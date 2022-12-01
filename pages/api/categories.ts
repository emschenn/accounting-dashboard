import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const URL = "https://secure.splitwise.com/api/v3.0";

  await fetch(`${URL}/get_categories`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.SPLITWISE_API_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((data) => res.status(200).json(data))
    .catch((error) => {
      console.error(error);
    });
}
