export interface VehicleListStateInterface {
  sortOrder: ListSortOrder;
  sortBy: FilterByProp;
  searchString?: string;
  filterBy: FilterByProp;
}

export type ListSortOrder = 'asc' | 'desc';
export type FilterByProp = 'name' | 'manufacturer' | 'model';
