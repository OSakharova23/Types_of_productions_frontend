import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { toggleLikeThunk, deleteProductionThunk } from '../store/slices/productionTypesSlice';
import { type IProductionType } from '../modules/production_types_mock';

interface ICardProps {
  item: IProductionType;
}

export const ProductionTypesCard: FC<ICardProps> = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const defaultImage = '/img/default-image.jpg';

  const handleClick = () => navigate(`/feed/${item.production_id}`);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAuth === 1) {
      dispatch(toggleLikeThunk({ id: item.production_id, action: item.is_liked === 1 ? 0 : 1 }));
    }
  };

  const handleDelete = () => {
    dispatch(deleteProductionThunk(item.production_id));
  };

  return (
    <div className="card-wrapper">
      <div className="card" onClick={handleClick}>
        <img src={item.image_url || defaultImage} alt={item.craft_title} className="card-image" />
        <div className="card-info">
          <p className="card-title">{item.craft_title}</p>
          <p className="card-text-norma">Норма: {item.production_output_rate} шт</p>
          <div className="card-like-row">
            <span 
              className="likes-icon" 
              style={{ 
                // В плитке: красный/бордовый если лайкнут (и авторизован), серый если нет
                color: (isAuth === 1 && item.is_liked === 1) ? '#cd0b0b' : '#808080', 
                cursor: isAuth === 1 ? 'pointer' : 'default' 
              }}
              onClick={handleLike}
            >
              ♥
            </span> 
            <span className="likes-count-text">{item.likes_count}</span>
          </div>
        </div>
      </div>
      
      {item.is_creator === 1 && isAuth === 1 && (
        <form className="delete-form" onSubmit={(e) => e.preventDefault()}>
          <button type="button" className="delete-link" onClick={handleDelete}>Удалить</button>
        </form>
      )}
    </div>
  );
};