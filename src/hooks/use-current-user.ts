import { api } from "@/../convex/_generated/api";
import { useQuery } from "convex/react";

export function useCurrentUser() {
  const currentUser = useQuery(api.users.currentUser);
  const isLoading = currentUser === undefined;

  return { currentUser, isLoading };
}
