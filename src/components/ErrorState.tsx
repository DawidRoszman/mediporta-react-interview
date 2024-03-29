import { Alert } from "@mui/material";

function ErrorState({ errorMessage }: { errorMessage: string; }) {
  return <Alert severity="error">
    Error: {errorMessage}. Please try again later!
  </Alert>;
}

export default ErrorState;