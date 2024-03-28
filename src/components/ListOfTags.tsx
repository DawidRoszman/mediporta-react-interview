import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTags } from './TagsContext';
import { useQuery } from '@tanstack/react-query';
import { fetchTags } from '../utils/queries';

interface Row {
  name: string;
  count: number;
}

function CustomPaginationActionsTable() {
  const tagsSettings = useTags();
  if (tagsSettings === null) return null;
  const { page, rowsPerPage } = tagsSettings;

  const fetchTagsHelper = async () => {
    console.log(page, rowsPerPage)
    const data = await fetchTags(page, rowsPerPage);
    return data;
  }

  const query = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTagsHelper
  });

  if (query.isPending) return <div>Loading...</div>
  if (query.isError) return <div>Error: {query.error.message}</div>
  console.log(query.data);
  const rows = query.data.data.items.map((item: any) => {
    return {
      name: item.name,
      count: item.count
    }
  })
  const has_more = query.data.data.has_more;




  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">

        <TableBody>
          <TableRow>
            <TableCell>Tag</TableCell>
            <TableCell>Count</TableCell>
          </TableRow>
          {(tagsSettings.rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row: Row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {row.count}
              </TableCell>
            </TableRow>
          ))}
          {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )} */}
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
  )
}
export default ListOfTags