import axios from "axios"

export const fetchTags = async (numOfRows: number, page: number) => {
  try {
    const response = await axios.get(`https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${numOfRows}&order=desc&sort=popular&site=stackoverflow&filter=!T.BkwE7kN.OD6_qxzS`)
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}
