import { MovieResponse } from "api/movies/types";
import { PaginatableCollection } from "types";

export enum PrivateListSortOptions {
  ASC = "created_at.asc",
  DESC = "created_at.desc",
}

export interface ResourceInteractionBaseResponse {
  status_code: number;
  status_message: string;
  success?: boolean;
}

export interface GetPrivateListRequest {
  accountId: number;
  sessionId: string
  page: number;
  sort_by: PrivateListSortOptions;
}
