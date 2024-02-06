import { Button, FormHelperText, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useScore } from "../contexts/ScoreProvider";
import { ScoreSavedPopup } from "../popups/ScoreSavedPopup";
import { saveScore } from "../services/score-service";
import { CHAR_SCORES } from "../utils/constants";
import { Loader } from "./Loader";

export const Gameboard = () => {
  const scores = useScore();
  const maxTiles = 10;
  const [name, setName] = useState<string>("");
  const [tiles, setTiles] = useState<string[]>(new Array(maxTiles).fill(""));
  const [selected, setSelected] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [lastRank, setLastRank] = useState(0);
  const [showRankPopup, setShowRankPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e: any) => {
    setName(e.target.value);
    setErrors((prev) => [...prev.slice(0, 0), "", ...prev.slice(1)]);
  };

  const updateValue = (value: string, index: number) => {
    setTiles((prev) => [
      ...prev.slice(0, index),
      value,
      ...prev.slice(index + 1),
    ]);
    setErrors((prev) => [...prev.slice(1, 0), "", ...prev.slice(2)]);
  };

  const handleResetTiles = () => {
    setTiles(new Array(10).fill(""));
    setSelected(0);
    setErrors([]);
  };

  const handleKeyDown = (index: number, event: any) => {
    if (event.key === "Backspace") {
      if (tiles[index]) {
        updateValue("", index);
      } else if (index > 0) {
        setSelected(index - 1);
      }
    } else if (event.key === "ArrowLeft") {
      setSelected(index - 1);
    } else if (event.key === "ArrowRight") {
      setSelected(index + 1);
    } else if (event.key.length === 1) {
      const value = event.key.toUpperCase();
      if (value >= "A" && value <= "Z") {
        updateValue(value, index);
        if (index < maxTiles - 1) {
          setSelected(index + 1);
        }
      }
    }
  };

  const handleSaveScore = () => {
    const isValid = validate();
    if (isValid) {
      setLoading(true);
      saveScore(
        { name, input: tiles.join(""), score: totalScore },
        (res) => {
          setLastRank(res);
          setShowRankPopup(true);
          if (res <= 10) {
            scores.reload();
          }
        },
        () => {
          toast.error("Could not saved score");
        },
        () => {
          setLoading(false);
        }
      );
    }
  };

  const validate = () => {
    const errorList = [...errors];

    if (!name) {
      errorList[0] = "Please enter your name to save the score.";
    }

    const input = tiles.join(" ").trim();
    if (input.length === 0) {
      errorList[1] = "Please enter at least one tile to save your score.";
    } else if (input.includes("  ")) {
      errorList[1] = "Invalid input: Cannot leave empty tile in-between.";
    }

    setErrors(errorList);
    return !errorList.reduce((prev, curr) => prev || !!curr, false);
  };

  useEffect(() => {
    const inputRef = document.getElementById(`tile-${selected}`);
    if (inputRef) {
      inputRef.focus();
    }
  }, [selected]);

  useEffect(() => {
    const total = tiles
      .map((ch) => CHAR_SCORES[ch] || 0)
      .reduce((prev, curr) => prev + curr, 0);
    setTotalScore(total);
  }, [tiles]);

  return (
    <>
      {loading && <Loader />}
      {showRankPopup && (
        <ScoreSavedPopup
          rank={lastRank}
          open={showRankPopup}
          onClose={() => setShowRankPopup(false)}
        />
      )}
      <div className="flex flex-col gap-8">
        <TextField
          id={`input-name`}
          label="Your Name"
          value={name}
          onChange={handleNameChange}
          error={!!errors[0]}
          helperText={errors[0]}
        />
        <div className="flex flex-col">
          <div
            className={`flex gap-2 ${
              errors[1]
                ? "border border-solid border-red-500 p-2 rounded-md"
                : ""
            }`}
          >
            {tiles.map((value, index) => (
              <TextField
                key={index}
                id={`tile-${index}`}
                InputProps={{
                  className: "w-12 h-12",
                }}
                value={value}
                inputProps={{
                  maxLength: 1,
                  className:
                    "text-center caret-transparent !text-3xl !font-bold !p-0",
                }}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onClick={() => setSelected(index)}
              />
            ))}
          </div>
          {errors[1] && (
            <FormHelperText className="pl-3.5" error>
              {errors[1]}
            </FormHelperText>
          )}
        </div>
        <div>Total score: {totalScore}</div>
        <div className="flex gap-5">
          <Button
            variant="outlined"
            className="!normal-case !rounded-lg !py-2 !px-5"
            onClick={handleResetTiles}
          >
            Reset Tiles
          </Button>

          <Button
            variant="outlined"
            className="!normal-case !rounded-lg !py-2 !px-5"
            onClick={handleSaveScore}
          >
            Save Score
          </Button>

          {/* <Button
          variant="outlined"
          className="!normal-case !rounded-lg !py-2 !px-5"
          onClick={() => setIsCollapsed(true)}
        >
          View Top Scores
        </Button> */}
        </div>
      </div>
    </>
  );
};
