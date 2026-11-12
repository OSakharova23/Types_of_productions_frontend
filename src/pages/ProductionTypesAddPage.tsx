import { useState, useEffect, type FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../store';
import { api } from '../api';
import { fetchProductionTypes } from '../store/slices/productionTypesSlice';

export const ProductionTypesAddPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  const [step, setStep] = useState(1);
  const [draftId, setDraftId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    craft_title: '',
    description: '',
    production_output_rate: '',
    defect_waste_quantity: ''
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('/img/default-image.jpg');
  const [videoPreview, setVideoPreview] = useState<string>('/img/default-video.mp4');

  useEffect(() => {
    const checkDraft = async () => {
      if (isAuth === 1) {
        try {
          const res = await api.api.productionTypesControllerGetDraft();
          const draft: any = res.data; 
          
          if (draft) {
            setDraftId(draft.production_id);
            setFormData({
              craft_title: draft.craft_title || '',
              description: draft.description || '',
              production_output_rate: draft.production_output_rate !== null ? String(draft.production_output_rate) : '',
              defect_waste_quantity: draft.defect_waste_quantity !== null ? String(draft.defect_waste_quantity) : ''
            });
            if (draft.image_url) setImagePreview(draft.image_url);
            if (draft.video_url) setVideoPreview(draft.video_url);
            setStep(2);
          }
        } catch (error) {}
      }
    };
    checkDraft();
  }, [isAuth]);

  useEffect(() => {
    return () => {
      if (imagePreview !== '/img/default-image.jpg') URL.revokeObjectURL(imagePreview);
      if (videoPreview !== '/img/default-video.mp4') URL.revokeObjectURL(videoPreview);
    };
  }, [imagePreview, videoPreview]);

  if (isAuth === 0) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview('/img/default-image.jpg');
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideoFile(file);
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
    } else {
      setVideoPreview('/img/default-video.mp4');
    }
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.craft_title) {
      setErrors(['craft_title']);
      return;
    }
    setErrors([]);

    try {
      const payload: any = { craft_title: formData.craft_title };
      if (imageFile) payload.image = imageFile;
      if (videoFile) payload.video = videoFile;

      const res = await api.api.productionTypesControllerCreateService(payload);
      setDraftId((res.data as unknown as any).production_id);
      setStep(2);
    } catch (e: any) {
      console.error(e);
      alert("Ошибка создания черновика. Убедитесь, что у вас нет незавершенных черновиков.");
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];
    if (!formData.craft_title) newErrors.push('craft_title');
    if (!formData.description) newErrors.push('description');
    if (!formData.production_output_rate) newErrors.push('production_output_rate');
    if (!formData.defect_waste_quantity) newErrors.push('defect_waste_quantity');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors([]);

    if (draftId) {
      try {
        const payload: any = {
          craft_title: formData.craft_title,
          description: formData.description,
          production_output_rate: Number(formData.production_output_rate),
          defect_waste_quantity: Number(formData.defect_waste_quantity),
        };
        if (imageFile) payload.image = imageFile;
        if (videoFile) payload.video = videoFile;

        await api.api.productionTypesControllerPublishService(draftId, payload);
        dispatch(fetchProductionTypes());
        navigate('/');
      } catch (error) {
        console.error(error);
        alert("Ошибка при публикации.");
      }
    }
  };

  const hasError = (field: string) => errors.includes(field) ? 'input-error' : '';

  return (
    <div className="content-area content-area--scroll">
      <div className="add-container">
        <h3 className="add-title">Черновик типа производства</h3>

        <form className="add-form" onSubmit={step === 1 ? handleNext : handlePublish}>
          <div className="media-preview-box">
            <img 
              src={imagePreview} 
              alt="Превью" 
              className="media-preview-item"
              onError={(e) => { e.currentTarget.src = '/img/default-image.jpg'; }}
            />
            <input 
              id="image-upload" type="file" accept="image/*" onChange={handleImageChange} hidden 
            />
            <label htmlFor="image-upload" className="btn-base btn-file">ВЫБРАТЬ ИЗОБРАЖЕНИЕ</label>

            <video 
              src={videoPreview} 
              controls 
              className="media-preview-item video-margin"
              onError={(e) => { e.currentTarget.src = '/img/default-video.mp4'; }}
            ></video>
            <input 
              id="video-upload" type="file" accept="video/*" onChange={handleVideoChange} hidden 
            />
            <label htmlFor="video-upload" className="btn-base btn-file">ВЫБРАТЬ ВИДЕО</label>
          </div>

          <div className="form-group">
            <label className="form-label">Тип производства</label>
            <input
              type="text"
              name="craft_title"
              value={formData.craft_title}
              onChange={e => setFormData({ ...formData, craft_title: e.target.value })}
              placeholder="Например: Деревообработка"
              className={`form-input ${hasError('craft_title')}`}
            />
          </div>

          {step === 2 && (
            <>
              <div className="form-group">
                <label className="form-label">Описание</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className={`form-textarea ${hasError('description')}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Норма выхода продукции (шт)</label>
                <input
                  type="number"
                  name="production_output_rate"
                  value={formData.production_output_rate}
                  onChange={e => setFormData({ ...formData, production_output_rate: e.target.value })}
                  className={`form-input ${hasError('production_output_rate')}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Количество отходов/брака (кг)</label>
                <input
                  type="number"
                  name="defect_waste_quantity"
                  value={formData.defect_waste_quantity}
                  onChange={e => setFormData({ ...formData, defect_waste_quantity: e.target.value })}
                  className={`form-input ${hasError('defect_waste_quantity')}`}
                />
              </div>
            </>
          )}

          <button type="submit" className="btn-base btn-action">
            {step === 1 ? 'Далее' : 'Опубликовать'}
          </button>
        </form>
      </div>
    </div>
  );
};