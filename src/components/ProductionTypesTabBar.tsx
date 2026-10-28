import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductionTypesTabBar: FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="tabbar">
      <button type="button" className="tab-item" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => navigate('/feed')}>
        Лента
      </button>
      <button type="button" className="tab-item" style={{ background: 'none', border: 'none', cursor: 'default' }}>
        Добавление
      </button>
      <button type="button" className="tab-item" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => navigate('/')}>
        Плитка
      </button>
      <button type="button" className="tab-item" style={{ background: 'none', border: 'none', cursor: 'default' }}>
        Вход
      </button>
    </nav>
  );
};