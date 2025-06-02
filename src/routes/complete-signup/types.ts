export type UserFormFields = {
  name: string;
  cpf: string;
  birthDate: string;
  gender: string;
  phoneNumber: string;
  livesAlone: string;
  livesWith: string;
  hasDisability: string;
  disability: string;
  needsMedicalEquip: string;
  medicalEquip: string;
  takesMedication: string;
  medication: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  address: {
    street: string;
    number: string;
    additionalAddressInfo: string;
    district: string;
    city: string;
    state: string;
    zip: string;
  };
};

export type InstFormFields = {
  institutionName: string;
  cnpj: string;
  organizationType: string;
  personInCharge: {
    name: string;
    position: string;
  };
  address: {
    street: string;
    number: string;
    additionalAddressInfo: string;
    district: string;
    city: string;
    state: string;
    zip: string;
  };
};

export type FormStep = {
  uid: string;
  form: UserFormFields | InstFormFields;
  onFormChange: (name: string, value: string) => void;
  onNext: () => void;
  onBack?: () => void;
};

export const userFormFields: UserFormFields = {
  name: "",
  cpf: "",
  birthDate: "",
  gender: "",
  phoneNumber: "",
  livesAlone: "",
  livesWith: "",
  hasDisability: "",
  disability: "",
  needsMedicalEquip: "",
  medicalEquip: "",
  takesMedication: "",
  medication: "",
  emergencyContact: {
    name: "",
    relationship: "",
    phoneNumber: "",
  },
  address: {
    street: "",
    number: "",
    additionalAddressInfo: "",
    district: "",
    city: "",
    state: "",
    zip: "",
  },
};

export const instFormFields: InstFormFields = {
  institutionName: "",
  cnpj: "",
  organizationType: "",
  personInCharge: {
    name: "",
    position: "",
  },
  address: {
    street: "",
    number: "",
    additionalAddressInfo: "",
    district: "",
    city: "",
    state: "",
    zip: "",
  },
};
