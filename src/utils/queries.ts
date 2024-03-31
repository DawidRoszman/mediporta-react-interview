import axios from "axios";

export const fetchTags = async (
  page: number,
  numOfRows: number,
  order: "asc" | "desc",
  orderBy: "popular" | "name",
) => {
  const response = await axios.get(
    `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${numOfRows}&order=${order}&sort=${orderBy}&site=stackoverflow&filter=!T.BkwE7kN.OD6_qxzS`,
  );
  return response.data;
};
