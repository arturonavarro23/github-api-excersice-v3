import { useReducer } from 'react';

export default function useState(initalValues) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initalValues,
  );
  return [state, setState];
}
