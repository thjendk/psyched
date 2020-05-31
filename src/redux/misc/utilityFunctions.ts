export const insertOrReplace = <T extends any>(
  array: T[],
  items: T | T[],
  comparison: string = 'id'
) => {
  const replace = (item: T) => {
    const index = array.findIndex((arrayItem) => arrayItem[comparison] === item[comparison]);
    if (index !== -1) return (array[index] = item);
    return array.push(item);
  };

  if (Array.isArray(items)) {
    for (let item of items) {
      replace(item);
    }
  } else {
    replace(items);
  }
};

export const removeFromState = <T extends any>(array: T[], id: number, comparison = 'id') => {
  const index = array.findIndex((m) => m[comparison] === id);
  array.splice(index, 1);
};

export const insertOrRemove = <T extends any>(array: T[], item: T, comparison: keyof T = 'id') => {
  const index = array.findIndex((arrayItem) => arrayItem[comparison] === item[comparison]);
  if (index !== -1) return array.splice(index, 1);
  return array.push(item);
};
