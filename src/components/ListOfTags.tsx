import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTags } from "./TagsContext";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchTags } from "../utils/queries";
import { Alert, Stack, Skeleton } from "@mui/material";

interface Row {
  name: string;
  count: number;
}

function CustomPaginationActionsTable() {
  const tagsSettings = useTags();
  if (tagsSettings === null) return null;
  const { page, rowsPerPage } = tagsSettings;

  const fetchTagsHelper = async () => {
    console.log(page, rowsPerPage);
    const data = await fetchTags(page, rowsPerPage);
    return data;
  };

  const query = useQuery({
    queryKey: ["tags", page, rowsPerPage],
    queryFn: fetchTagsHelper,
  });

  if (query.isPending)
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="loading for table">
          <TableBody>
            <TableRow>
              <TableCell>Tag</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
            {Array(rowsPerPage).fill(0).map((_, id) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  <Skeleton />
                </TableCell>
                <TableCell style={{ width: 160 }}>
                  <Skeleton />
                </TableCell>
              </TableRow>
            )
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
  const has_more = query.data.has_more;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          <TableRow>
            <TableCell>Tag</TableCell>
            <TableCell>Count</TableCell>
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
const ListOfTags = () => {
  return (
    <>
      <CustomPaginationActionsTable />
    </>
  );
};
export default ListOfTags;

