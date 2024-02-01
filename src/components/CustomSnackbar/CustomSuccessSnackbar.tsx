import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useBookContext } from "../../context/BookProvider";

type Props = {
  successMessage: string;
};

export const CustomSuccessSnackbar: React.FC<Props> = ({ successMessage }) => {
  const { isOpenSnackbar, handleCloseSnackbar } = useBookContext();

  return (
    <div>
      <Snackbar
        open={isOpenSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
