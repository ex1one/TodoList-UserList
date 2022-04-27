const getPageCount = (totalCount, limit) => Math.ceil(totalCount / limit);

export const getPagesArray = (totalPages) => {
  const pages = [];
  for (let i = 0; i < totalPages; i += 1) {
    pages.push(i + 1);
    if (i === totalPages) break;
  }
  return pages;
};

export default getPageCount;
