export async function UrlToFile(url: string): Promise<File> {
  try {
    const response = await fetch(
      `/api/fetch-image?url=${encodeURIComponent(url)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const blob = await response.blob();
    const filename = url.split("/").pop() || "image.jpg";

    return new File([blob], filename, { type: blob.type });
  } catch (error) {
    console.error("Error converting URL to File:", error);
    throw error;
  }
}
