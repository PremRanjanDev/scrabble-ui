import { useState } from "react";
import { Gameboard } from "./Gameboard";
import { Leaderboard } from "./Leaderboard";

export const Home = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <div className="flex justify-between gap-4 p-10 ">
      <Gameboard onViewTopScores={() => setShowLeaderboard(true)} />
      {showLeaderboard && (
        <Leaderboard onClose={() => setShowLeaderboard(false)} />
      )}
    </div>
  );
};
