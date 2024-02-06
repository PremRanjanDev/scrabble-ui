import { Backdrop, CircularProgress } from "@mui/material";

export const Loader = () => {
  return (
    <Backdrop
      sx={{
        zIndex: (theme: any) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <CircularProgress />
    </Backdrop>
  );
};
