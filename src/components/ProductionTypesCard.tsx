import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { type IProductionType } from '../modules/production_types_mock';

interface ICardProps {
  item: IProductionType;
}

export const ProductionTypesCard: FC<ICardProps> = ({ item }) => {
  const navigate = useNavigate();
  const defaultImage = '/img/default-image.jpg';

  const handleClick = () => {
    navigate(`/feed/${item.production_id}`);
  };

  return (
    <div className="card-wrapper">
      <div className="card" onClick={handleClick}>
        <img
          src={item.image_url || defaultImage}
          alt={item.craft_title}
          className="card-image"
        />
        <div className="card-info">
          <p className="card-title">{item.craft_title}</p>
          <p className="card-text-norma">Норма: {item.production_output_rate} шт</p>
          <div className="card-like-row">
            <span className="likes-icon">♥</span> 
            <span className="likes-count-text">{item.likes_count}</span>
          </div>
        </div>
      </div>
      
      {item.is_creator === 1 && (
        <form className="delete-form" onSubmit={(e) => e.preventDefault()}>
          <button type="button" className="delete-link">Удалить</button>
        </form>
      )}
    </div>
  );
};