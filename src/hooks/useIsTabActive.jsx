import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTabActive } from '../redux/slice/conversation.slice';

export const useIsTabActive = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    const handleVisibilityChange = () => {
      dispatch(setTabActive(document.visibilityState === 'visible'));
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);  
};