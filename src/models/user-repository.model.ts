export interface UserRepository {
  id: number;
  name: string;

  // Owner Username
  ownerLogin: string;

  description: string | null;
}
