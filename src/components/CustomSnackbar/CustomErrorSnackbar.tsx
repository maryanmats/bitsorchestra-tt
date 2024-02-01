import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useBookContext } from "../../context/BookProvider";

type Props = {
  errorMessage: string;
};

export const CustomErrorSnackbar: React.FC<Props> = ({ errorMessage }) => {
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
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
