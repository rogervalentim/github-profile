import { useContext } from "react";
import { GithubContext, GithubContextType } from "./github-context";

export const useGithub = (): GithubContextType => {
  const context = useContext(GithubContext);
  if (!context) {
    throw new Error("useGithub must be used within a GithubProvider");
  }
  return context;
};
