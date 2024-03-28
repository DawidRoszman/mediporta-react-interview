import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatchTags, useTags } from "./TagsContext";
import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "../utils/queries";
import { Alert, Box, Skeleton, TableSortLabel } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { Type } from "../utils/tagsReducer";

interface Row {
  name: string;
  count: number;
}

function ListOfTags() {
  const tagsSettings = useTags();
  const dispatchTags = useDispatchTags();
  if (tagsSettings === null || dispatchTags === null) return null;
  const { page, rowsPerPage, order, orderBy } = tagsSettings;

  const fetchTagsHelper = async () => {
    const data = await fetchTags(page, rowsPerPage, order, orderBy);
    if (data.has_more) {
      dispatchTags(
        {
          type: Type.SET_HAS_MORE,
          payload: {
            has_more: data.has_more,
          },
        }
      )
    }
    return data;
  };

  const query = useQuery({
    queryKey: ["tags", page, rowsPerPage, order, orderBy],
    queryFn: fetchTagsHelper,
  });

  if (query.isPending)
    return (
      TableLoadingSkeleton(rowsPerPage)
    );
  if (query.isError)
    return (
      <Alert severity="error">
        Error: {query.error.message}. Please try again later!
      </Alert>
    );

  const rows = query.data.items.map((item: any) => {
    return {
      name: item.name,
      count: item.count,
    };
  });


  function handleRequestSort(name: string) {
    if (tagsSettings === null || dispatchTags === null) return;
    dispatchTags(
      {
        type: Type.SET_ORDER_BY,
        payload: {
          orderBy: name,
        },
      }
    )
    dispatchTags(
      {
        type: Type.SET_ORDER,
        payload: {
          order: order === "asc" ? "desc" : "asc",
        },
      }
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={order === 'asc' ? 'asc' : 'desc'}
                onClick={() => handleRequestSort('name')}
              >
                Tags
                {true ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'popular'}
                direction={order === 'asc' ? 'asc' : 'desc'}
                onClick={() => handleRequestSort('popular')}
              >
                Count
                {true ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>

            </TableCell>
          </TableRow>
          {rows.map((row: Row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }}>{row.count}</TableCell>
            </TableRow>
          )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListOfTags;

function TableLoadingSkeleton(rowsPerPage: number) {
  return <TableContainer component={Paper}>
    <Table sx={{ minWidth: 500 }} aria-label="loading for table">
      <TableBody>
        <TableRow>
          <TableCell>Tag</TableCell>
          <TableCell>Count</TableCell>
        </TableRow>
        {Array(rowsPerPage).fill(0).map((_, id) => (
          <TableRow key={id}>
            <TableCell component="th" scope="row">
              <Skeleton width="5rem" />
            </TableCell>
            <TableCell style={{ width: 160 }}>
              <Skeleton />
            </TableCell>
          </TableRow>
        )
        )}
      </TableBody>
    </Table>
  </TableContainer>;
}

