import { Gameboard } from "./Gameboard";
import { Leaderboard } from "./Leaderboard";

export const Home = () => {
  return (
    <div className="flex justify-between gap-4 p-10">
      <Gameboard />
      <Leaderboard />
    </div>
  );
};
