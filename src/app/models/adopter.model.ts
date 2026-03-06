export interface AdopterModel {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    livingType: LivingType;
}

export enum LivingType {
    House,
    Apartment
}

export interface Housing {
  value: string;
  viewValue: string;
}


