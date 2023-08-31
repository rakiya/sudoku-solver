import { Gene, Population } from "../organism";

export interface Selection<T> {
  execute(_: Population<T>): Gene<T>[];
}
