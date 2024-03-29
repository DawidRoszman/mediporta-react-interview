import { Box, Pagination, Skeleton } from "@mui/material"
import { Type } from "../utils/tagsReducer";
import { ChangeEvent } from "react";
import { useDispatchTags, useTags } from "../utils/useTags";

interface PageSelectionProps {
  pageCount: number;
}

const PageSelection = ({ pageCount }: PageSelectionProps) => {
  const tags = useTags();
  const tagsDispatch = useDispatchTags();

  if (tagsDispatch === null || tags === null) return (
    <Box
      justifyContent="center"
      display="flex">
      <Skeleton width="20rem" height={"5rem"} />
    </Box>
  );

  const onPageChange = (_: ChangeEvent<unknown>, value: number) => {
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
      <Pagination count={pageCount} page={tags.page} onChange={onPageChange} showFirstButton showLastButton />
    </Box>
  )
}

export default PageSelection