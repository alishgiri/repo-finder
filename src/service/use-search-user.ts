import {useState} from 'react';

import {octokit} from './base.service';
import {GitHubUser} from '../models/github-user.model';

interface UserSearchResult {
  users: GitHubUser[];
  totalResults: number;
}

const useSearchUser = (): [
  searchUser: (searchTerm: string) => Promise<void>,
  result: UserSearchResult | null,
  clearSearch: () => void,
  isLoading: boolean,
  error: string | null | undefined,
] => {
  let timer: string | number | NodeJS.Timeout | undefined;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [result, setResult] = useState<UserSearchResult | null>(null);

  const searchUser = async (searchTerm: string) => {
    softReset();

    if (searchTerm.length === 0) {
      clearSearch();
      return;
    } else if (searchTerm.length <= 2) {
      return;
    } else if (searchTerm.length > 100) {
      setError('Search term has to be less than 100 characters.');
      return;
    }

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

      const data: GitHubUser[] = [];
      response.data.items.forEach(user => {
        data.push({
          id: user.id,
          login: user.login,
          avatarUrl: user.avatar_url,
        });
      });

      setResult({
        users: data,
        totalResults: response.data.total_count,
      });
    } catch (e) {
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const softReset = () => {
    clearTimeout(timer);
    if (error != null) {
      setError(null);
    }
  };

  const clearSearch = () => {
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

  return [searchUser, result, clearSearch, isLoading, error];
};

export default useSearchUser;
