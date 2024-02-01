import { Button, MenuItem, TextField } from "@mui/material";
import moment from "moment";
import { useBookContext } from "../../context/BookProvider";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const AddBook = () => {
  const { addBook, books, editBook } = useBookContext();
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setIsbn] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
  });

  const findExistingBook = () => {
    return id ? books.find((book) => book.id === id) : null;
  };

  useEffect(() => {
    if (id) {
      const book = findExistingBook();

      if (book) {
        setTitle(book.title);
        setAuthor(book.author);
        setCategory(book.category);
        setIsbn(book.isbn);
        setCreatedAt(book.createdAt);
      }
    }
  }, [id, books]);

  const nowFormattedDate = moment().format("YYYY-MM-DDTHH:mm:ss") + "Z";

  const validateForm = () => {
    const newErrors = {
      title: title.trim() === "" ? "Title is required" : "",
      author: author.trim() === "" ? "Author is required" : "",
      category:
        category.trim() === "None" || category.trim() === ""
          ? "Category is required"
          : "",
      isbn: isbn.trim() === "" ? "ISBN is required" : "",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const maxId = books.reduce((max, book) => Math.max(max, +book.id), 0);
    const existingBook = findExistingBook();

    const newBook = {
      id: id || (maxId + 1).toString(),
      title,
      author,
      category,
      isbn,
      createdAt: id ? createdAt : nowFormattedDate,
      modifiedAt: id ? nowFormattedDate : "",
      active: existingBook ? existingBook.active : "active",
    };

    if (id) {
      editBook(newBook);
    } else {
      addBook(newBook);
    }
    navigate("/");
  };

  const uniqueCategories = [
    ...new Set(books.map((book) => book.category).filter(Boolean)),
  ];

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        onSubmit={handleSubmit}
      >
        <TextField
          value={title}
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setErrors({ ...errors, title: "" })}
          variant="outlined"
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          value={author}
          label="Author"
          onChange={(e) => setAuthor(e.target.value)}
          onFocus={() => setErrors({ ...errors, author: "" })}
          variant="outlined"
          error={!!errors.author}
          helperText={errors.author}
        />
        <TextField
          select
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onFocus={() => setErrors({ ...errors, category: "" })}
          error={!!errors.category}
          helperText={errors.category}
        >
          <MenuItem value="None">None</MenuItem>
          {uniqueCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          value={isbn}
          label="ISBN"
          onChange={(e) => setIsbn(e.target.value)}
          onFocus={() => setErrors({ ...errors, isbn: "" })}
          variant="outlined"
          error={!!errors.isbn}
          helperText={errors.isbn}
        />

        <Button variant="contained" type="submit">
          {id ? "Edit" : "Add New"}
        </Button>
      </form>
    </div>
  );
};
