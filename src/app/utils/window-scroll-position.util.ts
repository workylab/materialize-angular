export const windowScrollPosition = (): number => {
  if (window.pageYOffset) {
    return window.pageYOffset;
  }

  return document.body.scrollTop;
};
