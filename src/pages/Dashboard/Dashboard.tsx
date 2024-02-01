import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { DataTable } from "../../components/DataTable";
import { useState } from "react";
import { useBookContext } from "../../context/BookProvider";

const statusOptions = ["Show All", "Show Active", "Show Deactivated"];

export const Dashboard = () => {
  const { books } = useBookContext();
  const [status, setStatus] = useState("Show Active");
  const [count, setCount] = useState(0);

  const updateCount = (count: number) => {
    setCount(count);
  };

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
      }}
    >
      <Box
        width="100%"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
        }}
      >
        <TextField
          select
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
            width: "20%",
          }}
          label="Status"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        >
          {statusOptions.map((singleStatus) => (
            <MenuItem key={singleStatus} value={singleStatus}>
              {singleStatus}
            </MenuItem>
          ))}
        </TextField>
        <Typography>{`${count} ${
          status === "Show All"
            ? ""
            : status === "Show Active"
            ? "active"
            : "inactive"
        } Books of ${books.length}`}</Typography>
      </Box>
      <DataTable status={status} updateCount={updateCount} />
    </Box>
  );
};
