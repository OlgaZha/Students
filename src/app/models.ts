export interface Student {
  id: string;
  name: string;
  email: string;
  group: string;
  avatar?: string;
  age?: number;
  createdAt?: number;
}

export interface ColumnDef<T> {
  key: Extract<keyof T, string>;
  label: string;
  width?: string;
}
