import normalize from 'normalize-path';
import { sep as pathSep } from 'path';

export function pathNormalizeToLinux(pathToNormalize?: string): string {
  return pathToNormalize ? normalize(pathToNormalize) : pathToNormalize;
}

export function toWindowsCompatiblePath(path: string): string {
  return typeof path === 'string' ? path.replace(/\\/g, '\\\\') : '';
}

export function isParentDir(parent: string, child: string) {
  parent = parent.replace(/^\/$/, '');
  child = child.replace(/^\/$/, '');
  return parent && child && parent !== child && child.startsWith(parent);
}

export function buildPropagationPaths(absPath: string, endPath?: string): string[] {
  endPath = endPath?.replace(/\/$/, '') || '';

  const paths: string[] = [];
  const pathParts = absPath.split(pathSep);

  pathParts.forEach((_, index) => {
    const part = pathParts.slice(0, index + 1).join('/');
    if (!part || isParentDir(part, endPath)) return;
    paths.push(part);
  });

  return paths.reverse();
}
