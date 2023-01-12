import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

export const useRedirectTo = (to: string, condition: boolean, dependency: any[]) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (condition) {
      navigate(to)
    }
  }, dependency)

}