export const assetUrl = (path) => {
  const assetEnv = process.env.ASSET_URL;
  if (!path) {
    return null;
  }
  if (path.charAt(0) === '/') {
    return `${assetEnv}${path}`;
  }
  return `${assetEnv}/${path}`;
};

export const cdnUrl = (path) => {
  const cdnEnv = process.env.CDN_URL;
  if (!path) {
    return null;
  }
  if (path.charAt(0) === '/') {
    return `${cdnEnv}${path}`;
  }
  return `${cdnEnv}/${path}`;
};
