import { Header } from "./components/header";
import { CardInfo } from "./components/card-info";
import { Repos } from "./components/repos";
import { useGithub } from "./context/use-github";
import { Suspense } from "react";

// Fallback component
function Loading() {
  return <div>Loading...</div>;
}

export function App() {
  const { userData } = useGithub();

  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <div className="relative top-[-3rem] w-full px-5 pt-4 md:top-[-3rem] lg:mt-0 lg:px-40">
          <div className="flex gap-4 md:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[#20293A] md:h-32 md:w-32">
              <img
                className="h-20 w-20 rounded-xl md:h-28 md:w-28"
                src={userData?.avatar_url}
                alt={userData?.name}
              />
            </div>

            <div className="mt-16 flex flex-col items-start gap-4 md:mt-0 md:flex-row">
              <CardInfo text="Followers" value={userData?.followers} />
              <CardInfo text="Following" value={userData?.following} />
              <CardInfo text="Location" value={userData?.location} />
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <h1 className="text-3xl text-[#CDD5E0]">{userData?.name}</h1>
            <p className="text-gray-400">{userData?.bio}</p>
          </div>

          <Repos />
        </div>
      </Suspense>
    </>
  );
}
