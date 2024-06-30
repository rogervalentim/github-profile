import React, { createContext, useState, useEffect } from "react";

interface GithubProps {
  name: string;
  avatar_url: string;
  followers: number;
  following: number;
  login: string;
  location: string;
  bio: string;
}

export interface GithubContextType {
  userData: GithubProps | null;
  reposData: [];
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  fetchUserData: (username: string) => void;
  searchResults: GithubProps[] | null;
  searchUsers: (query: string) => void;
}

export const GithubContext = createContext<GithubContextType | undefined>(
  undefined,
);

const token = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<GithubProps | null>(null);
  const [reposData, setReposData] = useState<[]>([]);
  const [username, setUsername] = useState<string>("github");
  const [searchResults, setSearchResults] = useState<GithubProps[] | null>(
    null,
  );

  useEffect(() => {
    fetchUserData(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  function fetchUserData(username: string) {
    fetch(`https://api.github.com/users/${username}`, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        fetchUserRepos(username);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUserRepos(username: string) {
    fetch(`https://api.github.com/users/${username}/repos`, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setReposData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function searchUsers(query: string) {
    fetch(`https://api.github.com/search/users?q=${query}`, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.items);
        console.log(data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <GithubContext.Provider
      value={{
        userData,
        reposData,
        username,
        setUsername,
        fetchUserData,
        searchResults,
        searchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
