import { RefreshRounded } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getScore } from "../services/score-service";
import { getTimeDifference } from "../utils/date-time";

export const Leaderboard = () => {
  const [scores, setScores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadScores();
  }, []);

  const loadScores = () => {
    setIsLoading(true);
    getScore(
      (data) => {
        setScores(data);
      },
      (error) => {
        toast.error("Unable to load scores at the moment.");
      },
      () => {
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="border rounded-lg bg-orange-50">
      <div className="flex justify-between items-center px-4 rounded-t-lg text-white bg-orange-400">
        <div className="text-lg font-semibold">Leaderboard</div>
        <IconButton onClick={loadScores} title="Reload">
          <RefreshRounded className="text-white" />
        </IconButton>
      </div>
      <div className="py-2 px-4">
        {isLoading ? (
          <CircularProgress />
        ) : scores && scores.length ? (
          <div className="flex flex-col gap-4">
            {scores.map((s, index) => (
              <div
                key={index}
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
