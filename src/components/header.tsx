import { useState, FormEvent, ChangeEvent } from "react";
import hero from "../assets/hero-image-github-profile.png";
import search from "../assets/Search.svg";
import { useGithub } from "../context/use-github";

export function Header() {
  const { fetchUserData, searchUsers, searchResults } = useGithub();
  const [username, setUsername] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (e.target.value.trim() !== "") {
      searchUsers(e.target.value);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim() !== "") {
      fetchUserData(username);
      setShowDropdown(false);
    }
  };

  const handleUserSelect = (selectedUsername: string) => {
    fetchUserData(selectedUsername);
    setUsername(selectedUsername);
    setShowDropdown(false);
  };

  const singleResult =
    Array.isArray(searchResults) && searchResults.length > 0
      ? searchResults[0]
      : null;

  return (
    <header className="w-full">
      <div className="relative">
        <img
          src={hero}
          alt="background github"
          className="h-56 w-full object-cover lg:h-auto lg:object-contain"
        />
        <div className="absolute inset-0 flex justify-center pt-8">
          <div className="relative">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center">
                <input
                  type="text"
                  name="username"
                  className="h-14 w-[350px] max-w-full rounded-xl bg-[#20293A] pl-12 pr-4 text-white placeholder-gray-400 outline-none focus:outline-none focus:ring-2 focus:ring-[#3662E3] lg:w-[500px]"
                  placeholder="username"
                  value={username}
                  onChange={handleInputChange}
                />
                <button type="submit" className="absolute bg-transparent pl-3">
                  <img src={search} alt="search icon" />
                </button>
              </div>
            </form>

            {showDropdown && singleResult && (
              <div className="mt-4 w-[350px] rounded-xl bg-[#111729] p-2 lg:w-[500px]">
                <div
                  key={singleResult.login}
                  className="flex cursor-pointer gap-2 rounded-xl hover:bg-[#20293A]"
                  onClick={() => handleUserSelect(singleResult.login)}
                >
                  <img
                    src={singleResult.avatar_url}
                    alt={singleResult.login}
                    className="h-14 w-14 rounded-xl lg:h-20 lg:w-20"
                  />
                  <div>
                    <p className="ml-2 text-white">{singleResult.login}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
