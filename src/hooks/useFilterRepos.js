import { useState } from 'react';

export default function useFilterRepos(userRepos) {
  const [query, setQuery] = useState('');
  const repos = !query ? userRepos : userRepos.filter(r => r.name.includes(query));
  return [repos, query, setQuery]
}
