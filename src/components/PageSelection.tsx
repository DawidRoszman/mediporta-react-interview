import { Box, IconButton, Typography } from "@mui/material"
import { useDispatchTags, useTags } from "./TagsContext";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Type } from "../utils/tagsReducer";

const PageSelection = () => {
  const tags = useTags();
  const tagsDispatch = useDispatchTags();

  if (tagsDispatch === null || tags === null) return null;

  const onPageChange = (value: number) => {
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
      <IconButton onClick={() => onPageChange(tags.page - 1)} disabled={tags.page === 1}>
        <ArrowBackIos />
      </IconButton>
      <Typography>{tags.page}</Typography>
      {/* The maximum page number that will be returned for anonymous API access (no access token or app key) is 25 - https://api.stackexchange.com/docs */}
      <IconButton onClick={() => onPageChange(tags.page + 1)} disabled={tags.page >= 25}>
        <ArrowForwardIos />
      </IconButton>
    </Box>
  )
}

export default PageSelection