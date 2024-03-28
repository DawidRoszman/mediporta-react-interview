import { Box, Button, Skeleton, TextField } from "@mui/material"
import { useState } from "react"
import { useDispatchTags } from "./TagsContext"
import { Type } from "../utils/tagsReducer"

const Filters = () => {
  const [numOfItems, setNumOfItems] = useState(5)
  const tagsDispatch = useDispatchTags();


  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = parseInt(e.target.value)
    // The maximum page number that will be returned for anonymous API access (no access token or app key) is 25 - https://api.stackexchange.com/docs
    if (value > 0 && value < 25) {
      setNumOfItems(value)
    }
  }
  const onButtonClick = () => {
    if (tagsDispatch === null) return;
    tagsDispatch({
      type: Type.SET_ROWS_PER_PAGE,
      payload: {
        rowsPerPage: numOfItems
      }
    })
  }
  return (
    <Box
      display="flex"
      justifyContent="right"
      paddingX="2rem">
      {tagsDispatch === null ? <Skeleton variant="text" width="10rem" height="5rem" /> :
        <>
          <TextField id="num-of-items-on-page" value={numOfItems} type="number" onChange={(e) => onInputChange(e)} label="Number of items on page" variant="outlined" size="small" />
          <Button color="primary" onClick={() => onButtonClick()} variant="outlined">Ok</Button>
        </>
      }
    </Box>
  )
}

export default Filters