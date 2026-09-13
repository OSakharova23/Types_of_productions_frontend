export type ProductionStatus = 'draft' | 'published' | 'deleted';

export interface ProductionTypes {
  production_id: number;                 // ID типа производства
  craft_title: string;                   // Название ремесла
  description: string;                   // Описание ремесла
  production_output_rate: number;        // Норма выхода продукции (шт/смена) — фильтр
  defect_waste_quantity: number;         // Количество брака и отходов (кг)
  status: ProductionStatus;              // Статус: published, draft, deleted
  image_key: string;                     // Имя картинки в MinIO
  video_key: string;                     // Имя видео в MinIO
  user_liked_ids: number[];              // Лайки
}