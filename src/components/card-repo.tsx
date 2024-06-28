import chieldAlt from "../assets/Chield_alt.svg";
import nesting from "../assets/Nesting.svg";
import star from "../assets/Star.svg";

import { differenceInDays, parseISO } from "date-fns";

interface CardRepoProps {
  name: string | undefined;
  description: string | undefined;
  forks: number | undefined;
  stargazers_count: number | undefined;
  license: string | null | undefined;
  updated_at: string | undefined;
}

export function CardRepo({
  name,
  description,
  forks,
  stargazers_count,
  license,
  updated_at,
}: CardRepoProps) {
  const daysAgo = updated_at
    ? differenceInDays(new Date(), parseISO(updated_at))
    : undefined;

  return (
    <div className="w-full space-y-2 rounded-xl bg-gradient-to-r from-[#111729] to-[#1D1B48] py-4 pl-5">
      <div>
        <p className="text-lg text-[#CDD5E0]">{name}</p>
        <p className="text-gray-400">{description}</p>
      </div>

      <div className="flex items-center gap-5">
        <ul className="flex gap-3">
          {license && (
            <li className="flex items-center gap-1">
              <img src={chieldAlt} alt="chield alt icon" />
              <p className="text-gray-400">{license}</p>
            </li>
          )}
          {forks !== undefined && forks > 0 && (
            <li className="flex items-center gap-1">
              <img src={nesting} alt="nesting icon" />
              <p className="text-gray-400">{forks}</p>
            </li>
          )}

          {stargazers_count !== undefined && stargazers_count > 0 && (
            <li className="flex items-center gap-1">
              <img src={star} alt="star icon" />
              <p className="text-gray-400">{stargazers_count}</p>
            </li>
          )}
        </ul>
        <div>
          {daysAgo !== undefined && (
            <p className="text-sm text-gray-400">
              {daysAgo === 0 ? "updated today" : `updated ${daysAgo} days ago`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
