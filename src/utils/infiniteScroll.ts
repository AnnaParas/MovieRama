// src/utils/infiniteScroll.ts
export function setupInfiniteScroll(loadMore: () => void) {
  window.addEventListener("scroll", () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const threshold = 200;

    if (scrollPosition > documentHeight - threshold) {
      loadMore();
    }
  });
}
