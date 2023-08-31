import { Gene } from "../organism";

export type EvaluationFunction<T> = (_: Gene<T>) => number;
