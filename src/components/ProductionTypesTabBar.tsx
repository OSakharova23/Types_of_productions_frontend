import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store'; // ИСПРАВЛЕНО: добавлен type
import { setAuth } from '../store/slices/userSlice';
import { logoutManual } from '../api'; // ИСПРАВЛЕНО: logoutManual берется из api
import { resetFilters } from '../store/slices/productionTypesSlice';

export const ProductionTypesTabBar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  const handleAuthClick = async () => {
    if (isAuth === 1) {
      try {
        await logoutManual();
      } catch (e) {}
      dispatch(setAuth(0));
      dispatch(resetFilters());
      navigate('/users/login');
    } else {
      navigate('/users/login');
    }
  };

  const handleAddClick = () => {
    if (isAuth === 1) navigate('/production_types/add');
  };

  return (
    <nav className="tabbar">
      <button type="button" className="tab-item" onClick={() => navigate('/production_types/feed')}>Лента</button>
      <button 
        type="button" 
        className="tab-item" 
        onClick={handleAddClick}
        style={{ cursor: isAuth === 1 ? 'pointer' : 'default' }}
      >
        Добавление
      </button>
      <button type="button" className="tab-item" onClick={() => navigate('/production_types')}>Плитка</button>
      <button type="button" className="tab-item" onClick={handleAuthClick}>
        {isAuth === 1 ? 'ВЫХОД' : 'ВХОД'}
      </button>
    </nav>
  );
};