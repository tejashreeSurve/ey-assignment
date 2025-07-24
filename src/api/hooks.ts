import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchCharater, fetchCharaters } from "./fetchers";

export function useFetchCharates({ page }: { page: number }) {
  return useQuery({
    queryKey: ["charaters", page],
    queryFn: () => fetchCharaters(page),
    placeholderData: keepPreviousData,
  });
}

export function useCharater(id: string) {
  return useQuery({
    queryKey: ["charater", id],
    queryFn: () => fetchCharater(id),
  });
}
