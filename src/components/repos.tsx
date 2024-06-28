import { useState } from "react";
import { CardRepo } from "./card-repo";
import { useGithub } from "../context/use-github";

interface ReposProps {
  id: number;
  name: string;
  description: string;
  forks: number;
  stargazers_count: number;
  license: {
    spdx_id: string;
  } | null;
  updated_at: string;
}

export function Repos() {
  const { reposData } = useGithub();
  const [showAll, setShowAll] = useState(false);

  const displayedData = showAll ? reposData : reposData.slice(0, 4);
  return (
    <>
      <div className="grid grid-cols-1 items-start gap-8 pt-8 lg:grid-cols-2">
        {displayedData.map((repo: ReposProps) => (
          <CardRepo
            key={repo.id}
            name={repo.name}
            description={repo.description}
            forks={repo.forks}
            stargazers_count={repo.stargazers_count}
            license={repo.license?.spdx_id}
            updated_at={repo.updated_at}
          />
        ))}
      </div>

      {!showAll && reposData.length > 4 && (
        <div className="flex items-center justify-center pt-12">
          <button
            onClick={() => setShowAll(true)}
            className="text-gray-400 hover:text-gray-500"
          >
            View all repositories
          </button>
        </div>
      )}
      {showAll && reposData.length > 4 && (
        <div className="flex items-center justify-center pt-12">
          <button
            onClick={() => setShowAll(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            View less repositories
          </button>
        </div>
      )}
    </>
  );
}
