import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Action, Type } from "../utils/tagsReducer";
import React from "react";

interface Row {
  name: string;
  count: number;
}

interface TagsTableProps {
  data: Row[];
  tagsDispatch: React.Dispatch<Action>;
  order: "asc" | "desc";
  orderBy: "name" | "popular";
}

function TagsTable({ data, tagsDispatch, order, orderBy }: TagsTableProps) {
  function handleRequestSort(name: "name" | "popular") {
    if (tagsDispatch === null) return;
    tagsDispatch({
      type: Type.SET_ORDER_BY,
      payload: {
        orderBy: name,
      },
    });
    tagsDispatch({
      type: Type.SET_ORDER,
      payload: {
        order: order === "asc" ? "desc" : "asc",
      },
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "name"}
                direction={order === "asc" ? "asc" : "desc"}
                onClick={() => handleRequestSort("name")}
              >
                Tags
                {orderBy === "name" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "popular"}
                direction={order === "asc" ? "asc" : "desc"}
                onClick={() => handleRequestSort("popular")}
              >
                Count
                {orderBy === "popular" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          </TableRow>
          {data.map((row: Row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }}>{row.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TagsTable;
