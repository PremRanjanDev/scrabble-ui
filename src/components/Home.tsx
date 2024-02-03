import { Playzone } from "./Playzone";
import { Leaderboard } from "./Leaderboard";

export const Home = () => {
  return (
    <div className="flex justify-between gap-4 p-10">
      <Playzone />
      <Leaderboard />
    </div>
  );
};
