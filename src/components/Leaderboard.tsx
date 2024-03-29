import { RefreshRounded } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress, IconButton } from "@mui/material";
import { useScore } from "../contexts/ScoreProvider";
import { getTimeDifference } from "../utils/date-time";

type Props = {
  onClose: () => void;
};

export const Leaderboard = ({ onClose }: Props) => {
  const scores = useScore();
  return (
    <div className="border rounded-lg bg-orange-50">
      <div className="flex justify-between items-center pl-4 rounded-t-lg text-white bg-orange-400">
        <div className="text-lg font-semibold">Leaderboard</div>
        <div>
          <IconButton onClick={scores.reload} title="Reload">
            <RefreshRounded className="text-white" />
          </IconButton>
          <IconButton onClick={onClose} title="Close">
            <CloseIcon className="text-white" />
          </IconButton>
        </div>
      </div>
      <div className="py-2 px-4">
        {scores?.loading && <CircularProgress />}
        {scores?.results?.length ? (
          <div className="flex flex-col gap-4">
            {scores.results.map((s, index) => (
              <div
                key={`score-${index + 1}`}
                className="flex gap-2 justify-between items-center border border-solid border-orange-500 bg-orange-100 rounded-lg px-4 py-2"
              >
                <div className="text-gray-500">{index + 1}</div>
                <div className="text-lg font-semibold flex relative">
                  {index === 0 && (
                    <div className="absolute -top-3.5 -left-2 transform rotate-[-20deg]">
                      👑
                    </div>
                  )}
                  <div>{s.name}</div>
                </div>
                <div className="text-lg text-white bg-orange-400 px-2 rounded-lg">
                  {s.score}
                </div>
                <div className="text-sm text-gray-500">
                  {getTimeDifference(s.createdAt)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  );
};
