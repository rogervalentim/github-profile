import { useEffect, useState } from "react";
import { Header } from "./components/header";
import { CardInfo } from "./components/card-info";
import { Repos } from "./components/repos";

interface GithubProps {
  name: string;
  avatar_url: string;
  followers: number;
  following: number;
  location: string;
  bio: string;
}

export function App() {
  const [data, setData] = useState<GithubProps | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch("https://api.github.com/users/github")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Header />
      <div className="relative top-[-3rem] w-full px-5 lg:top-[-2rem] lg:px-40">
        <div className="flex gap-4 lg:items-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-[#20293A]">
            <img
              className="h-28 w-28 rounded-xl"
              src={data?.avatar_url}
              alt={data?.name}
            />
          </div>

          <div className="mt-16 flex flex-col items-start gap-4 lg:mt-0 lg:flex-row">
            <CardInfo text="Followers" value={data?.followers} />
            <CardInfo text="Following" value={data?.following} />
            <CardInfo text="Location" value={data?.location} />
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <h1 className="text-3xl text-[#CDD5E0]">{data?.name}</h1>
          <p className="text-gray-400">{data?.bio}</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 pt-8 lg:grid-cols-2">
          <Repos />
        </div>
      </div>
    </>
  );
}
