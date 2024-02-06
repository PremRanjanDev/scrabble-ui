import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getScores } from "../services/score-service";
import { toast } from "react-toastify";

interface Result {
  id: number;
  name: string;
  score: number;
  createdAt: string;
}

interface ScoreContextValue {
  results: Result[];
  loading: boolean;
  reload: () => void;
}

const defaultContextValue: ScoreContextValue = {
  results: [],
  loading: false,
  reload: () => {},
};

const ScoreContext = createContext<ScoreContextValue>(defaultContextValue);

export const ScoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadScores = () => {
    setLoading(true);
    getScores(
      (data) => {
        setResults(data);
      },
      (error) => {
        toast.error("Error fetching scores:", error);
      },
      () => {
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    loadScores();
  }, []);

  return (
    <ScoreContext.Provider value={{ results, loading, reload: loadScores }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return context;
};
