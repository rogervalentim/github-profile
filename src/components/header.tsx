import { useState, FormEvent, ChangeEvent } from "react";
import hero from "../assets/hero-image-github-profile.png";
import search from "../assets/Search.svg";
import { useGithub } from "../context/use-github";

export function Header() {
  const { fetchUserData } = useGithub();
  const [username, setUsername] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchUserData(username);
  };

  return (
    <header className="w-full">
      <div className="relative">
        <img
          src={hero}
          alt="background github"
          className="h-48 w-full object-cover lg:h-auto lg:object-contain"
        />
        <div className="absolute inset-0 flex justify-center pt-8">
          <div className="relative">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center">
                <input
                  type="text"
                  name="username"
                  className="h-12 w-96 rounded-md bg-[#20293A] pl-12 pr-4 text-white placeholder-gray-400 outline-none focus:outline-none focus:ring-2 focus:ring-[#3662E3] lg:w-[500px]"
                  placeholder="username"
                  value={username}
                  onChange={handleInputChange}
                />
                <button type="submit" className="absolute bg-transparent pl-3">
                  <img src={search} alt="search icon" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
