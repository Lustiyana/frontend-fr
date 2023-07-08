export const getActive = (url, currentUrl, type = 1) => {
  const path = currentUrl.split("/");
  if (type === 0 && currentUrl.length === 1)
    return "text-base-blue max-md:bg-base-blue max-md:text-white";
  if (path.includes(url)) {
    return "text-base-blue max-md:bg-base-blue max-md:text-white";
  }
};
