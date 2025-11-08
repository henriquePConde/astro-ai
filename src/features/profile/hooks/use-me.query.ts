import { useQuery } from '@tanstack/react-query';
import { getMe } from '../services/user.service';

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => getMe(),
    staleTime: 60_000,
  });
}
