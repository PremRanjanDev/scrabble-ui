import { SCORE } from "../api/score-api";
import { SCORES } from "../mock/mock-score-data";
import { api } from "./service-helper";

export async function getScore(
  onSuccess: (data: any) => void,
  onError: (error: any) => void,
  onFinally: () => void = () => {}
) {
  // api
  //   .get(SCORE)
  //   .then((res) => {
  //     onSuccess(res.data);
  //   })
  //   .catch((err) => {
  //     onError(err);
  //   })
  //   .finally(() => {
  //     onFinally();
  //   });
  onSuccess(SCORES);
  onFinally();
}
