import { GetAccountDetailsResponse } from "api/account/types";
import { AccountDetails } from "types";

export const normalizeAccountDetails = (data: GetAccountDetailsResponse): AccountDetails => {
  const { id, username, name, avatar } = data;
  return {
    id: id.toString(),
    username,
    name,
    avatar: avatar.tmdb.avatar_path,
  }
}