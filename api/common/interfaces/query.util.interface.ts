type QueryDirection = 'asc' | 'desc';
type QueryDateField = 'created_at' | 'updated_at';

export interface IQuery {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: string;
  order?: QueryDirection;
  year?: number;
  month?: number;
  day?: number;
  dateField?: QueryDateField;
}
