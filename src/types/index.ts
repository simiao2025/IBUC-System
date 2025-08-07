export interface Student {
  id: string;
  name: string;
  birthDate: string;
  cpf: string;
  gender: 'male' | 'female' | 'other';
  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  phone: string;
  email: string;
}

export interface Parent {
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  fatherCpf: string;
  motherCpf: string;
}

export interface StudentData extends Student {
  parents: Parent;
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  level: Level;
  polo: string;
  enrollmentDate: string;
  observations?: string;
}

export type Level = 'NIVEL_I' | 'NIVEL_II' | 'NIVEL_III' | 'NIVEL_IV';

export const LEVELS = {
  NIVEL_I: 'NÍVEL I - 2 a 5 anos',
  NIVEL_II: 'NÍVEL II - 6 a 8 anos',
  NIVEL_III: 'NÍVEL III - 9 a 11 anos',
  NIVEL_IV: 'NÍVEL IV - 12 a 16 anos',
} as const;

export interface Polo {
  id: string;
  name: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
  pastor: string;
  coordinator: {
    name: string;
    cpf: string;
  };
  teachers: string[];
  assistants?: string[];
  cafeteriaWorkers?: string[];
  availableLevels: Level[];
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'student';
  studentId?: string;
}