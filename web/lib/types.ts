export type Demo = {
  production_index: number;
  batch: number;
  image: string;
  scene: string;
  exact_prompt: string;
};

export type Style = {
  slug: string;
  name: string;
  category_id: number;
  source_doc: "main" | "expanded";
  reusable_prompt: string;
  demo: Demo | null;
};

export type Category = {
  id: number;
  title: string;
  styles: Style[];
};

export type GalleryData = {
  categories: Category[];
  total: number;
  withDemo: number;
};
