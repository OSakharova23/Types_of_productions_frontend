const BASE_URL = import.meta.env.BASE_URL || '/';

export const getAssetUrl = (assetPath: string): string => {
  if (!assetPath) return '';
  if (/^(https?:|data:|blob:)/i.test(assetPath)) {
    return assetPath;
  }
  const normalizedBase = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
  const normalizedPath = assetPath.replace(/^\/+/, '');
  return `${normalizedBase}${normalizedPath}`;
};

export const DEFAULT_IMAGE_URL = getAssetUrl('img/default-image.jpg');
export const DEFAULT_VIDEO_URL = getAssetUrl('img/default-video.mp4');