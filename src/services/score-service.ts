import { API_SCORE } from "../api/score-api";
import { api } from "./service-helper";

export async function getScores(
  onSuccess: (data: any) => void,
  onError: (error: any) => void,
  onFinally: () => void = () => {}
) {
  api
    .get(API_SCORE)
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((err) => {
      onError(err);
    })
    .finally(() => {
      onFinally();
    });
}

export async function saveScore(
  data: { name: string; input: string; score: number },
  onSuccess: (data: any) => void,
  onError: (error: any) => void,
  onFinally: () => void = () => {}
) {
  api
    .post(API_SCORE, data)
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((err) => {
      onError(err);
    })
    .finally(() => {
      onFinally();
    });
}
