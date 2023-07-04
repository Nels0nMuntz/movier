import { Status } from "./Status";

export interface Result<T = unknown> {
  status: Status;
  data?: T;
}