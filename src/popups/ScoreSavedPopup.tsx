import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

type Props = {
  rank: number;
  open: boolean;
  onClose: () => void;
};

export const ScoreSavedPopup = ({ rank, open, onClose }: Props) => {
  return (
    <Modal
      open={true}
      onClose={onClose}
      className="flex items-center justify-center "
    >
      <Box className="flex flex-col justify-center items-center bg-white w-80 h-96 rounded-lg">
        <div className="text-3xl">Congratulation!</div>
        <div className="text-xl">You are rank</div>
        <div className=" text-white bg-orange-400 px-2 rounded-lg">{rank}</div>
      </Box>
    </Modal>
  );
};
