import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import moment from "moment";
import { dataCell } from "./constants";
import { TableActions } from "./TableActions";
import { useBookContext } from "../../context/BookProvider";
import React from "react";

type Props = {
  status: string;
  updateCount: (count: number) => void;
};

export const DataTable: React.FC<Props> = ({ status, updateCount }) => {
  const { books } = useBookContext();

  const filteredBooks = books.filter((book) => {
    switch (status) {
      case "Show Active":
        return book.active === "active";

      case "Show Deactivated":
        return book.active === "inactive";

      default:
        return book;
    }
  });

  updateCount(filteredBooks.length);

  const formatDateTime = (originalDate: string) => {
    return moment(originalDate).format("D MMMM YYYY, h:mmA");
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {dataCell.map((cell, index) => (
              <TableCell
                align={index > 0 ? "right" : "left"}
                sx={{
                  fontWeight: "700",
                }}
                key={cell}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredBooks.map((book) => (
            <TableRow
              key={book.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {book.title}
              </TableCell>
              <TableCell align="right">{book.author}</TableCell>
              <TableCell align="right">{book.category}</TableCell>
              <TableCell align="right">{book.isbn}</TableCell>
              <TableCell align="right">
                {!book.createdAt ? "--" : formatDateTime(book.createdAt)}
              </TableCell>
              <TableCell align="right">
                {!book.modifiedAt ? "--" : formatDateTime(book.modifiedAt)}
              </TableCell>
              <TableCell align="right">
                <TableActions isActive={book.active} bookId={book.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
