export interface UserRepository {
  id: number;
  name: string;
  description: string | null;

  // Owner Username
  ownerLogin: string;

  forksCount: number | undefined;

  // Star Count
  stargazersCount: number | undefined;
}
