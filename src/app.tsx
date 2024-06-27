import { useEffect, useState } from "react";
import { Header } from "./components/header";
import { CardInfo } from "./components/card-info";

interface GithubProps {
  name: string;
  avatar_url: string;
  followers: number;
  following: number;
  location: string;
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
      <div className="relative top-[-2rem]">
        <div className="absolute left-0 top-0 w-full px-5 lg:px-40">
          <div className="flex items-center gap-4">
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-[#364153]">
              <img
                className="h-28 w-28 rounded-xl"
                src={data?.avatar_url}
                alt={data?.name}
              />
            </div>

            <div className="flex gap-4">
              <CardInfo text="Followers" value={data?.followers} />
              <CardInfo text="Following" value={data?.following} />
              <CardInfo text="Location" value={data?.location} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
