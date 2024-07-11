import {useMemo} from 'react';

const usePagination = (totalPages) => {
  const pagesArray = useMemo(() => {
    const array = [];
    for (let i = 0; i < totalPages; i++) {
      array.push(i + 1);
    }
    return array;
  }, [totalPages]);

  return pagesArray;
};

export default usePagination;