import { Status } from "./Status";

export interface CollectionParams<T> {
  status: Status;
  data: T[];
  page: number;
  isLastPage: boolean;
}