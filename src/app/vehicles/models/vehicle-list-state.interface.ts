export interface VehicleListStateInterface {
  sortOrder?: ListSortOrder;
  searchString?: string;
  filterBy?: ListFilteringStateInterface;
}

export interface ListFilteringStateInterface {
  filterByProp?: string;
  filterValue?: string;
}

export type ListSortOrder = 'asc' | 'desc';
