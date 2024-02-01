import { Button, ButtonGroup } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import React from "react";
import { useBookContext } from "../../../context/BookProvider";
import { Link } from "react-router-dom";

type Props = {
  isActive: string;
  bookId: string;
};

export const TableActions: React.FC<Props> = ({ isActive, bookId }) => {
  const { deleteBook, toggleStatus, books } = useBookContext();
  const editBook = books.find((book) => book.id === bookId);

  if (!editBook) {
    return null;
  }

  return (
    <ButtonGroup size="small">
      <Link to={`/addbook/${editBook.id}`} style={{ textDecoration: "none" }}>
        <Button>
          <EditIcon />
        </Button>
      </Link>
      ,
      {isActive === "inactive" && (
        <Button onClick={() => deleteBook(bookId)}>
          <DeleteIcon />
        </Button>
      )}
      ,
      <Button onClick={() => toggleStatus(bookId)}>
        {isActive === "active" ? <ToggleOnIcon /> : <ToggleOffIcon />}
      </Button>
      ,
    </ButtonGroup>
  );
};
