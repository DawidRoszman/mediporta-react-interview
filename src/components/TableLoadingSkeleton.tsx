import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Skeleton } from "@mui/material";

function TableLoadingSkeleton({ rowsPerPage }: { rowsPerPage: number }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="loading for table">
        <TableBody>
          <TableRow>
            <TableCell>Tag</TableCell>
            <TableCell>Count</TableCell>
          </TableRow>
          {Array(rowsPerPage)
            .fill(0)
            .map((_, id) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  <Skeleton width="5rem" />
                </TableCell>
                <TableCell style={{ width: 160 }}>
                  <Skeleton />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableLoadingSkeleton;

