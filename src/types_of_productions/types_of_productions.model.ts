export type ProductionStatus = 'draft' | 'published' | 'deleted';

export interface TypesOfProductions {
  production_id: number;                 // ID типа производства
  craft_title: string;                   // Название ремесла
  production_output_rate: number;        // Норма выхода продукции (шт/смена) — фильтр
  defect_waste_quantity: number;         // Количество брака и отходов (кг)
  dating_century: number;                // Датировка мастерской (век н.э.)
  technological_cycle_hours: number;     // Производственный цикл (часы)
  status: ProductionStatus;              // Статус: published, draft, deleted
  image_key: string;                     // Имя картинки в MinIO
  video_key: string;                     // Имя видео в MinIO
  user_liked_ids: number[];              // Лайки
}