import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getScore } from "../services/score-service";

interface Result {
  id: number;
  name: string;
  score: number;
  createdAt: string;
}

interface ScoreContextValue {
  results: Result[];
  loading: boolean;
}

const defaultContextValue: ScoreContextValue = {
  results: [],
  loading: false,
};

const ScoreContext = createContext<ScoreContextValue>(defaultContextValue);

export const ScoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  console.log("calling -- ScoreProvider");

  useEffect(() => {
    console.log("useEffect - ScoreProvider");

    getScore(
      (data) => {
        setResults(data);
      },
      (error) => {
        console.error("Error fetching scores:", error);
      },
      () => {
        setLoading(false);
      }
    );
  }, []);

  return (
    <ScoreContext.Provider value={{ results, loading }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error("useScore must be used within an ScoreProvider");
  }
  return context;
};
