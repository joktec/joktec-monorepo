import fs, { Stats } from 'fs-extra';

// Calculate size of a file or directory
export const calculateSize = async (path: string): Promise<number> => {
  const stats: Stats = await fs.stat(path);
  if (stats.isDirectory()) {
    let totalSize = 0;
    const files = await fs.readdir(path);
    for (const file of files) {
      totalSize += await calculateSize(`${path}/${file}`);
    }
    return totalSize;
  } else {
    return stats.size;
  }
};

// Remove a folder or file
export const removePath = async (path: string): Promise<boolean> => {
  if (!(await fs.pathExists(path))) return false;

  const stats: Stats = await fs.stat(path);
  if (stats.isDirectory()) {
    const files: string[] = await fs.readdir(path);
    for (const file of files) {
      await removePath(`${path}/${file}`);
    }
    await fs.rmdir(path);
  } else {
    await fs.unlink(path);
  }
  return true;
};
