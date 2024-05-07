import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const getPersist = (value) => ({
  type: "TESTPERSIST",
  value,
});
