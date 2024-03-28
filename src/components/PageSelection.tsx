import { Box, Pagination } from "@mui/material"
import { useDispatchTags, useTags } from "./TagsContext";
import { Type } from "../utils/tagsReducer";
import { ChangeEvent } from "react";

const PageSelection = () => {
  const tags = useTags();
  const tagsDispatch = useDispatchTags();

  if (tagsDispatch === null || tags === null) return null;

  const onPageChange = (e: ChangeEvent<unknown>, value: number) => {
    tagsDispatch({
      type: Type.SET_PAGE,
      payload: {
        page: value
      }

    })
  }
  return (
    <Box
      justifyContent="center"
      display="flex"
      padding="1rem"
      alignItems="center"
    >
      <Pagination count={25} page={tags.page} onChange={onPageChange} showFirstButton showLastButton />
    </Box>
  )
}

export default PageSelection