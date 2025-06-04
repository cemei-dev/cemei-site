export interface EducationalAxisEntity {
  id: string;
  name: string;
  imageUrl: string;
}

export type EducationalAxisDTO = Omit<EducationalAxisEntity, "id">;

export const nullEducationalAxisData: EducationalAxisDTO = {
  name: "",
  imageUrl: ""
};
