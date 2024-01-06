import {useEffect, useState} from 'react';

import {octokit} from './base.service';
import {UserRepository} from '../models/user-repository.model';

interface FetchRepositoriesResult {
  repositories: UserRepository[];
}

const useFetchRepositories = (
  username: string,
): [
  result: FetchRepositoriesResult | null,
  isLoading: boolean,
  error: string | null | undefined,
] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [result, setResult] = useState<FetchRepositoriesResult | null>(null);

  useEffect(() => {
    fetchUserRepositories();
  }, []);

  const fetchUserRepositories = async () => {
    if (!username) {
      setError('"username" is missing.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await octokit.request('GET /users/{username}/repos', {
        username: username,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      const data: UserRepository[] = [];
      response.data.forEach(repo => {
        data.push({
          id: repo.id,
          name: repo.name,
          forksCount: repo.forks_count,
          ownerLogin: repo.owner.login,
          description: repo.description,
          stargazersCount: repo.stargazers_count,
        });
      });

      setResult({repositories: data});
    } catch (e) {
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (e: any) => {
    if (typeof e === 'string') {
      setError(e);
    } else if (e instanceof Error) {
      setError(e.message);
    }
  };

  return [result, isLoading, error];
};

export default useFetchRepositories;
