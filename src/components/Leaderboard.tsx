import { CircularProgress } from "@mui/material";
import { useScore } from "../contexts/ScoreProvider";
import { getTimeDifference } from "../utils/date-time";

export const Leaderboard = () => {
  const scores = useScore();

  console.log("scores: ", scores);

  return (
    <div className="border rounded-lg p-5">
      <div>Leaderboard</div>
      {scores.loading ? (
        <CircularProgress />
      ) : (
        <div>
          {scores.results.map((r, index) => (
            <div className="flex gap-2 justify-between">
              <div>{index + 1}</div>
              <div>{(index === 0 ? "👑 " : "") + r.name}</div>
              <div>{r.score}</div>
              <div>{getTimeDifference(r.createdAt)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
