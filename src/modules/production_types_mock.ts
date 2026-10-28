export interface IProductionType {
  production_id: number;
  craft_title: string;
  description: string | null;
  production_output_rate: number | null;
  defect_waste_quantity: number | null;
  image_url: string | null;
  video_url: string | null;
  likes_count: number;
  is_creator: number;
  is_liked: number;
  status: string;
  created_at?: string;
  formed_at?: string | null;
}

export const PRODUCTION_TYPES_MOCK: IProductionType[] = [
  {
    production_id: 1,
    craft_title: 'Гончарное производство',
    description: 'Гончарное производство - одно из древнейших ремёсел...',
    production_output_rate: 150,
    defect_waste_quantity: 18,
    image_url: null, 
    video_url: null, 
    likes_count: 3,
    is_creator: 0,
    is_liked: 0,
    status: 'published',
  },
  {
    production_id: 2,
    craft_title: 'Металлургия',
    description: 'Металлургия - ремесло обработки руды...',
    production_output_rate: 40,
    defect_waste_quantity: 65,
    image_url: null,
    video_url: null,
    likes_count: 2,
    is_creator: 0,
    is_liked: 0,
    status: 'published',
  },
  {
    production_id: 3,
    craft_title: 'Кожевенное дело',
    description: 'Кожевенное дело - обработка шкур животных для получения мягкой, прочной и долговечной кожи.',
    production_output_rate: 85,
    defect_waste_quantity: 12,
    image_url: null,
    video_url: null,
    likes_count: 4,
    is_creator: 0,
    is_liked: 0,
    status: 'published',
  },
  {
    production_id: 4,
    craft_title: 'Деревообработка',
    description: 'Черновик услуги...',
    production_output_rate: 60,
    defect_waste_quantity: 30,
    image_url: null,
    video_url: null,
    likes_count: 0,
    is_creator: 0,
    is_liked: 0,
    status: 'draft',
  }
];