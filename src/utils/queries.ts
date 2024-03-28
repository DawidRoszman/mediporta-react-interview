import axios from "axios";

export const fetchTags = async (page: number, numOfRows: number) => {
  const response = await axios.get(
    `htts://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${numOfRows}&order=desc&sort=popular&site=stackoverflow&filter=!T.BkwE7kN.OD6_qxzS`,
  );
  return response.data;
};
