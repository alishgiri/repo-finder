import {useState} from 'react';

import {octokit} from './base.service';
import {UserRepository} from '../models/user-repository.model';

interface FetchRepositoryInfoResult {
  languages: string[];
}

const useFetchRepositoryInfo = (): [
  fetchRepoInfo: (repo: UserRepository) => void,
  result: FetchRepositoryInfoResult | null,
  isLoading: boolean,
  error: string | null | undefined,
] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [result, setResult] = useState<FetchRepositoryInfoResult | null>(null);

  const fetchRepoInfo = async (repo: UserRepository) => {
    fetchRepoLanguages(repo);
  };

  const fetchRepoLanguages = async (repo: UserRepository) => {
    try {
      setIsLoading(true);
      const response = await octokit.request(
        'GET /repos/{owner}/{repo}/languages',
        {
          repo: repo.name,
          owner: repo.ownerLogin,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        },
      );

      // Sort data to indicate the Primary language.
      // (The first item in the array with the highest).
      let dataToProcess: [string, number][] = [];

      for (var lang in response?.data ?? []) {
        dataToProcess.push([lang, response?.data[lang]]);
      }

      dataToProcess.sort((a, b) => b[1] - a[1]);

      const orderedData = dataToProcess.map(item => {
        return item[0];
      });

      setResult({languages: orderedData});
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

  return [fetchRepoInfo, result, isLoading, error];
};

export default useFetchRepositoryInfo;
