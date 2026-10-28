import { type FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTION_TYPES_MOCK, type IProductionType } from '../modules/production_types_mock';

export const ProductionTypesFeedPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [production_type_item, setProductionTypeItem] = useState<IProductionType | null>(null);
  
  const defaultVideo = '/img/default-video.mp4';

  const publishedList = PRODUCTION_TYPES_MOCK.filter(item => item.status === 'published');

  useEffect(() => {
    if (!publishedList.length) return;

    if (!id) {
      setProductionTypeItem(publishedList[0]);
      return;
    }
    const foundItem = publishedList.find(item => String(item.production_id) === id);
    if (foundItem) {
      setProductionTypeItem(foundItem);
    } else {
      setProductionTypeItem(publishedList[0]);
    }
  }, [id]);

  const handleNext = () => {
    if (!production_type_item) return;
    const currentIndex = publishedList.findIndex(
      item => item.production_id === production_type_item.production_id
    );
    const nextItem = publishedList[currentIndex + 1];
    if (nextItem) {
      navigate(`/feed/${nextItem.production_id}`);
    } else {
      navigate(`/feed/${publishedList[0].production_id}`);
    }
  };

  if (!production_type_item) return null;

  return (
    <div className="content-area feed-screen">
      <video 
        className="feed-video" 
        src={production_type_item.video_url || defaultVideo} 
        autoPlay 
        loop 
        muted 
        playsInline 
      />

      <div className="feed-overlay">
        <div className="feed-top">
          <h2 className="feed-title">{production_type_item.craft_title}</h2>
        </div>

        <div className="feed-right">
          <div className="feed-like-clean">
            <span className="feed-like-icon">♥</span>
            <span className="feed-like-count">{production_type_item.likes_count}</span>
          </div>
          <button type="button" onClick={handleNext} className="feed-btn">🡳</button>
        </div>

        <input type="checkbox" id="feed-expand" className="feed-expand-checkbox" hidden />
        <div className="feed-info">
          <p className="feed-desc">{production_type_item.description}</p>
          <div className="feed-param-norma">Норма: <strong>{production_type_item.production_output_rate} шт</strong></div>
          <div className="feed-row-bottom">
            <label htmlFor="feed-expand" className="feed-more-label">
              <span className="feed-more-open">Ещё</span>
              <span className="feed-more-close">Свернуть</span>
            </label>
            <div className="feed-param-brak">Брак: <strong>{production_type_item.defect_waste_quantity} кг</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};