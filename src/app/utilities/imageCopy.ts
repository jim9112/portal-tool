function extractImageUrls(layoutSections: any): string[] {
  const imageUrls: string[] = [];

  function searchForImages(obj: any) {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (key === 'src' && typeof obj[key] === 'string') {
          imageUrls.push(obj[key]);
        } else {
          searchForImages(obj[key]);
        }
      }
    }
  }

  searchForImages(layoutSections);
  return imageUrls;
}

const imageUrls = extractImageUrls(layoutSections);
console.log(imageUrls);
