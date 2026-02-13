import { createContext } from "react";
import type { SkillContextValue } from "./skills-provider";

export const SkillsContext = createContext<SkillContextValue | undefined>(
  undefined
);
