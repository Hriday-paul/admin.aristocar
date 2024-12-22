export function showImage(imageObj) {
  if (typeof imageObj === "string") {
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}${imageObj}`;
  }

  if (!imageObj?.url) return "";

  if (imageObj?.url?.includes("amazonaws")) return imageObj?.url;

  return `${process.env.NEXT_PUBLIC_IMAGE_URL}${imageObj?.url}`;
}
