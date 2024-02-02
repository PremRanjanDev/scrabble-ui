import { SCORE } from "../api/score-api";
import { api } from "./service-helper";

export async function getScore(
  onSuccess: (data: any) => void,
  onError: (error: any) => void,
  onFinally: () => void = () => {}
) {
  console.log("getScore called");

  api
    .get(SCORE)
    .then((res) => {
      console.log("res: ", res);
      onSuccess(res.data);
    })
    .catch((err) => {
      console.error("Error in getScore:", err);
      onError(err);
    })
    .finally(() => {
      onFinally();
    });
}
