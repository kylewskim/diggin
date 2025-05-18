export const urls = {
  basename: '/pop_up',
  root: '/',
  sign_in: '/sign_in',
  sign_in_request: '/sign_in_request',
  sign_out_request: '/sign_out_request',
  sign_in_fail: '/sign_in_fail',
  home: '/home',
  create_gem: '/create_gem',
  result: '/result',
  adjustPathName: (pathName: string): string => {
    return urls.removeIndexHtml(urls.removeBasename(pathName));
  },
  removeIndexHtml: (pathName: string): string => {
    return pathName.replace('index.html', '');
  },
  removeBasename: (pathName: string): string => {
    return pathName.replace(urls.basename, '');
  },
  shouldDirectToHome: (url: string): boolean => {
    const set = new Set([urls.root, urls.sign_in]);

    return set.has(url);
  },
};
