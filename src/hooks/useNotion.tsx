import { getArticles } from "@services/notion";
import { useQuery } from "@tanstack/react-query";

export const useNotion = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  return { articles: data, error, isPending };
};
