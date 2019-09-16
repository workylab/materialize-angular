export const getOffseTop = (element: HTMLElement): number => {
  let offsetTop = 0;
  let nextElement: HTMLElement = element;

  while (nextElement.offsetParent) {
    if (!isNaN(nextElement.offsetTop)) {
      offsetTop += nextElement.offsetTop;
    }

    nextElement = nextElement.offsetParent as HTMLElement;
  }

  return offsetTop;
};

