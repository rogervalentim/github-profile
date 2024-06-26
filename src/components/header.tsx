import hero from "../assets/hero-image-github-profile.png";
import search from "../assets/Search.svg";

export function Header() {
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
            <div className="flex items-center">
              <input
                type="text"
                name="name"
                className="h-12 w-96 rounded-md bg-[#20293A] pl-12 pr-4 text-white placeholder-gray-400 outline-none focus:outline-none focus:ring-2 focus:ring-[#3662E3] lg:w-[500px]"
                placeholder="username"
              />
              <button type="button" className="absolute bg-transparent pl-3">
                <img src={search} alt="search icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
