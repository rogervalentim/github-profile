import { useEffect, useState } from "react";
import { CardRepo } from "./card-repo";

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
  const [data, setData] = useState<ReposProps[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch("https://api.github.com/users/github/repos")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {data?.map((repo) => (
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
    </>
  );
}
