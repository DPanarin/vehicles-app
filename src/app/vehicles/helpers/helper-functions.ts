import {VehicleListStateInterface} from '../models/vehicle-list-state.interface';

export function filterByUniqueId<T extends Record<string, any>>(array: T[], key: string) {
  const uniqueItemsMap = array.reduce((map, currentItem) => {
    const id = currentItem[key];

    if (!map.has(id)) {
      map.set(id, currentItem);
    }
    return map;
  }, new Map<string, T>());

  return Array.from(uniqueItemsMap.values());
}

export function filterById<T extends Record<string, any>>(array: T[], filterSettings: VehicleListStateInterface) {
  return array.filter((item: T) => {
    return item[(filterSettings.filterBy || '')].toLowerCase().includes(filterSettings.searchString);
  })
}

export function sortById<T extends Record<string, any>>(array: T[], filterSettings: VehicleListStateInterface) {
  const sortedArray = [...array];
  return sortedArray.sort((itemA: T, itemB: T) => {
    const valA = itemA[(filterSettings.sortBy || '')];
    const valB = itemB[(filterSettings.sortBy || '')];

    if (valA < valB) {
      return filterSettings.sortOrder === 'asc' ? -1 : 1;
    }
    if (valA > valB) {
      return filterSettings.sortOrder === 'asc' ? 1 : -1;
    }

    return 0;
  })
}
