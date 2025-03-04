import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export function useAxiosInstance() {
  const { userDetails } = useContext(AppContext);

  let token = sessionStorage.getItem('edusoftToken');

  // Remove double quotes from the token
  token = token && token.replace(/"/g, '');

  return {
    headers: {
      Authorization: userDetails.token || token
    }
  };
}
