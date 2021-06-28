import useSWR, { SWRResponse } from "swr";

export const usePhemeStats = (): SWRResponse<Stats, any> => {
  if (!process.env.NEXT_PUBLIC_API_ENDPOINT) {
    throw new Error("env NEXT_PUBLIC_API_ENDPOINTがないよ");
  }
  const url = process.env.NEXT_PUBLIC_API_ENDPOINT;

  return useSWR<Stats>(url);
};

export const useDiscordProfile = (
  id: string
): SWRResponse<DiscordUser, any> => {
  return useSWR<DiscordUser>(`/api/discord/users/${id}`);
};
