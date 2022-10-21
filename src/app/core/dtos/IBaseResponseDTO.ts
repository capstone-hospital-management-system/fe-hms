export interface IBaseResponseDTO<T> {
  data: T;
  code: number;
  status: string;
  message: string;
  meta?: {
    page: number;
    per_page: number;
    total_page: number;
    total_data: number;
  };
}
