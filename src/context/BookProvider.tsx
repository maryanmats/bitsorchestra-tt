import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useEffect,
} from "react";
import { Book } from "../types/Book";
import noop from "../utils/utils";
import { client } from "../utils/client";
import {
  CustomErrorSnackbar,
  CustomSuccessSnackbar,
} from "../components/CustomSnackbar";

type BookContextProps = {
  books: Book[];
  isOpenSnackbar: boolean;
  handleOpenSnackbar: () => void;
  handleCloseSnackbar: () => void;
  addBook: (book: Book) => void;
  editBook: (book: Book) => void;
  deleteBook: (bookId: string) => void;
  toggleStatus: (bookId: string) => void;
};

const BookContext = createContext<BookContextProps>({
  books: [],
  isOpenSnackbar: false,
  handleOpenSnackbar: noop,
  handleCloseSnackbar: noop,
  addBook: noop,
  editBook: noop,
  deleteBook: noop,
  toggleStatus: noop,
});

export const BookProvider = ({ children }: PropsWithChildren) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch(client + "books")
      .then((response) => response.json())
      .then((books) => setBooks(books))
      .catch((error) => setErrorMessage("Error: " + error));
  }, []);

  const handleOpenSnackbar = () => setIsOpenSnackbar(true);

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpenSnackbar(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const addBook = async (newBook: Book) => {
    await fetch(client + "books", {
      method: "POST",
      body: JSON.stringify(newBook),
    })
      .then((response) => response.json())
      .then((books) => {
        setBooks((prevBooks) => [...prevBooks, books]);
        setSuccessMessage("Book is added successfully!");
        setIsOpenSnackbar(true);
      })
      .catch((error) => {
        setErrorMessage("Error creating book: " + error);
        setIsOpenSnackbar(true);
      });
  };

  const editBook = async (editedBook: Book) => {
    try {
      const response = await fetch(client + "books/" + editedBook.id, {
        method: "PATCH",
        body: JSON.stringify(editedBook),
      });

      if (response.ok) {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            +book.id === +editedBook.id ? editedBook : book
          )
        );
        setSuccessMessage("Book is updated successfully!");
        setIsOpenSnackbar(true);
      } else {
        setErrorMessage("Error updating book: " + response.statusText);
        setIsOpenSnackbar(true);
      }
    } catch (error) {
      setErrorMessage("Error updating book: " + error);
      setIsOpenSnackbar(true);
    }
  };

  const deleteBook = async (bookId: string) => {
    try {
      const response = await fetch(client + "books/" + bookId, {
        method: "DELETE",
      });

      if (response.ok) {
        setBooks((prevBooks) =>
          prevBooks.filter((book) => +book.id !== +bookId)
        );
        setSuccessMessage("Book is deleted successfully!");
        setIsOpenSnackbar(true);
      } else {
        setErrorMessage("Error: " + response.statusText);
        setIsOpenSnackbar(true);
      }
    } catch (error) {
      setErrorMessage("Error deleting book: " + error);
      setIsOpenSnackbar(true);
    }
  };

  const toggleStatus = async (bookId: string) => {
    const bookToUpdate = books.find((book) => +book.id === +bookId);

    if (bookToUpdate) {
      const updatedStatus =
        bookToUpdate.active === "active" ? "inactive" : "active";

      try {
        const response = await fetch(client + "books/" + bookId, {
          method: "PATCH",

          body: JSON.stringify({
            active: updatedStatus,
          }),
        });

        if (response.ok) {
          setBooks((prevBooks) =>
            prevBooks.map((book) =>
              +book.id === +bookId
                ? {
                    ...book,
                    active: updatedStatus,
                  }
                : book
            )
          );
          setSuccessMessage("Status toggled successfully!");
          setIsOpenSnackbar(true);
        } else {
          setErrorMessage("Error toggling status: " + response.statusText);
          setIsOpenSnackbar(true);
        }
      } catch (error) {
        setErrorMessage("Error toggling status: " + error);
        setIsOpenSnackbar(true);
      }
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        isOpenSnackbar,
        handleOpenSnackbar,
        handleCloseSnackbar,
        addBook,
        editBook,
        deleteBook,
        toggleStatus,
      }}
    >
      {isOpenSnackbar && successMessage && (
        <CustomSuccessSnackbar successMessage={successMessage} />
      )}
      {isOpenSnackbar && errorMessage && (
        <CustomErrorSnackbar errorMessage={errorMessage} />
      )}

      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
};
