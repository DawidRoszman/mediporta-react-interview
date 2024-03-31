import { Box, Button, Skeleton, TextField } from "@mui/material";
import { useState } from "react";
import { Type } from "../utils/tagsReducer";
import { useDispatchTags } from "../utils/useTags";

const Filters = () => {
  const [numOfItems, setNumOfItems] = useState(5);
  const tagsDispatch = useDispatchTags();

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 100) {
      setNumOfItems(value);
    }
  };
  const onButtonClick = () => {
    if (tagsDispatch === null) return;
    tagsDispatch({
      type: Type.SET_ROWS_PER_PAGE,
      payload: {
        rowsPerPage: numOfItems,
      },
    });
  };
  return (
    <Box display="flex" justifyContent="right" paddingX="2rem">
      {tagsDispatch === null ? (
        <Skeleton variant="text" width="10rem" height="5rem" />
      ) : (
        <>
          <TextField
            id="num-of-items-on-page"
            value={numOfItems}
            type="number"
            onChange={(e) => onInputChange(e)}
            label="Number of items on page"
            variant="outlined"
            size="small"
          />
          <Button
            color="primary"
            onClick={() => onButtonClick()}
            variant="outlined"
          >
            Ok
          </Button>
        </>
      )}
    </Box>
  );
};

export default Filters;

