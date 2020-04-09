import Cookies from 'js-cookie';
import moment from 'moment';

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

export function formatDateCalendar(date: string) {
  return moment(date).calendar(moment(), {
    sameDay: '[今天]',
    nextDay: '[明天]',
    nextWeek: 'M月DD日',
    lastDay: '[昨天]',
    lastWeek: 'M月DD日',
    sameElse(now) {
      if (moment(now).year === moment(date).year) {
        return 'M月DD日';
      }
      return 'YYYY年M月DD日';
    },
  });
}


export function formatRangePickerMoment(startTime: string, endTime: string): any {
  if (startTime && endTime) {
    return [moment(startTime), moment(endTime)];
  }
}
