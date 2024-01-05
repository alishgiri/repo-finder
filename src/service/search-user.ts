import {useState} from 'react';
import {Octokit} from 'octokit';

import {GitHubUser} from '../models/github-user.model';

interface UserSearchResult {
  users: [GitHubUser];
  totalResults: number;
}

const useSearchUser = (): [
  searchUser: (searchTerm: string) => Promise<void>,
  result: UserSearchResult | null,
  isLoading: boolean,
  error: string | null | undefined,
] => {
  let timer: string | number | NodeJS.Timeout | undefined;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [result, setResult] = useState<UserSearchResult | null>(null);

  const octokit = new Octokit();

  const searchUser = async (searchTerm: string) => {
    clearTimeout(timer);

    if (searchTerm.length === 0) {
      hardReset();
      return;
    }

    if (searchTerm.length <= 2) return;

    if (searchTerm.length > 100) {
      setError('Search term has to be less than 100 characters.');
      return;
    }

    softReset();

    timer = setTimeout(() => fetchUsers(searchTerm), 800);
  };

  const fetchUsers = async (searchTerm: string) => {
    try {
      setIsLoading(true);
      const response = await octokit.request('GET /search/users', {
        q: searchTerm,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      const data = response.data.items.map(user => ({
        id: user.id,
        login: user.login,
        reposUrl: user.repos_url,
        avatarUrl: user.avatar_url,
      }));

      setResult({
        users: data as [GitHubUser],
        totalResults: response.data.total_count,
      });
    } catch (e) {
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const softReset = () => {
    if (error != null) {
      setError(null);
    }
  };

  const hardReset = () => {
    setError(null);
    setResult(null);
    setIsLoading(false);
  };

  const handleError = (e: any) => {
    if (typeof e === 'string') {
      setError(e);
    } else if (e instanceof Error) {
      setError(e.message);
    }
  };

  return [searchUser, result, isLoading, error];
};

export default useSearchUser;
