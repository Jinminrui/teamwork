import Cookies from 'js-cookie';

export function setCookies(name: string, value: string | object) {
  Cookies.set(name, value);
}

export function getCookies(name: string) {
  return Cookies.get(name);
}

export function removeCookies(name: string) {
  Cookies.remove(name);
}

/**
 * 计算时间间隔
 * @param startTime
 */
export function getTimeGap(startTime: string) {
  const now = new Date();
  const duration = Math.abs(now.getTime() - new Date(startTime).getTime());
  return Math.floor(duration / (24 * 3600 * 1000));
}

/**
 * 获取提及成员的姓名
 * @param mentions
 */
export function getMetionsNames(mentions: string) {
  const result: Array<string> = [];
  const reg = /@(\w+)\s/;
  let templete = mentions;
  function match() {
    if (reg.test(templete)) {
      // 判断模板里是否有模板字符串
      const exe = reg.exec(templete);
      if (exe) {
        result.push(exe[1]);
      }
      templete = templete.replace(reg, '');
      match();
    }
  }
  match();
  return result;
}

export function getUrlParams(url: string) {
  const temp = url.split('?')[1];
  const params = temp.split('&');
  const obj: Record<string, any> = {};
  params.forEach(item => {
    const key = item.split('=')[0];
    const value = item.split('=')[1];
    obj[key] = value;
  });
  return obj;
}
