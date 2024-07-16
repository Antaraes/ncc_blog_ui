import { filterbyName } from '@/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useSearchQuery = (searchQuery: string) => {
  return useQuery({
    queryKey: ['search'],
    queryHash: searchQuery,
    queryFn: () => filterbyName(searchQuery),
    enabled: !!searchQuery,
  });
};

export default useSearchQuery;
