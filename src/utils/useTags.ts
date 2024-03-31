import { useContext } from "react";
import { DispatchTagsContext, TagsContext } from "../components/TagsContext";

export function useTags() {
  return useContext(TagsContext);
}

export function useDispatchTags() {
  return useContext(DispatchTagsContext);
}

