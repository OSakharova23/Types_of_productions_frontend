import { type FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchProductionTypes, toggleLikeThunk } from '../store/slices/productionTypesSlice';

export const ProductionTypesFeedPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { items, loading } = useSelector((state: RootState) => state.productionTypes);
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  
  // ИСПРАВЛЕНИЕ: Добавлен <any>
  const [currentItem, setCurrentItem] = useState<any>(null);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchProductionTypes());
  }, [dispatch, items.length]);

  useEffect(() => {
    if (items.length > 0) {
      if (!id) {
        setCurrentItem(items[0]);
      } else {
        const found = items.find((i: any) => String(i.production_id) === id);
        setCurrentItem(found || items[0]);
      }
    }
  }, [id, items]);

  const handleNext = () => {
    if (!currentItem) return;
    const currentIndex = items.findIndex((i: any) => i.production_id === currentItem.production_id);
    const nextItem = items[currentIndex + 1];
    navigate(`/feed/${nextItem ? nextItem.production_id : items[0].production_id}`);
  };

  const handleLike = () => {
    if (isAuth === 1 && currentItem) {
      dispatch(toggleLikeThunk({ id: currentItem.production_id, action: currentItem.is_liked === 1 ? 0 : 1 }));
    }
  };

  if (loading || !currentItem) return <div className="feed-screen" style={{ background: '#000' }}></div>;

  return (
    <div className="content-area feed-screen">
      <video className="feed-video" src={currentItem.video_url || '/img/default-video.mp4'} autoPlay loop muted playsInline />
      <div className="feed-overlay">
        <div className="feed-top"><h2 className="feed-title">{currentItem.craft_title}</h2></div>
        <div className="feed-right">
          <div className="feed-like-clean" style={{ cursor: isAuth === 1 ? 'pointer' : 'default' }} onClick={handleLike}>
            <span 
              className="feed-like-icon" 
              style={{ 
                // Если авторизован И стоит лайк - ставим бордовый (тут можешь поменять #cd0b0b на другой HEX), иначе белый
                color: (isAuth === 1 && currentItem.is_liked === 1) ? '#cd0b0b' : '#ffffff' 
              }}>
              ♥
            </span>
            <span className="feed-like-count">{currentItem.likes_count}</span>
          </div>
          <button type="button" onClick={handleNext} className="feed-btn">🡳</button>
        </div>
        <input type="checkbox" id="feed-expand" className="feed-expand-checkbox" hidden />
        <div className="feed-info">
          <p className="feed-desc">{currentItem.description}</p>
          <div className="feed-param-norma">Норма: <strong>{currentItem.production_output_rate} шт</strong></div>
          <div className="feed-row-bottom">
            <label htmlFor="feed-expand" className="feed-more-label">
              <span className="feed-more-open">Ещё</span>
              <span className="feed-more-close">Свернуть</span>
            </label>
            <div className="feed-param-brak">Брак: <strong>{currentItem.defect_waste_quantity} кг</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};