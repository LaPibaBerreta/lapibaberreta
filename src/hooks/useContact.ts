import { useQuery } from "@tanstack/react-query";
import { getContact } from "../lib/contactQuery";

export function useContact() {
  return useQuery({
    queryKey: ["contact"],
    queryFn: getContact,
  });
}
