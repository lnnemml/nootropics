import type { MDXComponents } from "mdx/types";
import { StudyCite } from "./StudyCite";
import { ForumVoice } from "./ForumVoice";

export function getMdxComponents(): MDXComponents {
  return {
    StudyCite,
    ForumVoice,
  };
}
