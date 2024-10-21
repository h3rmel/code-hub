export interface IMeal {
  id: number;
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export interface IMealFormData extends Omit<IMeal, 'id' | 'slug' | 'image'> {
  image: File;
}
