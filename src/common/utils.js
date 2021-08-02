export function debounce(func, delay){
  let timer = null
  return function(...args){
    if(timer) clearInterval(timer)
    timer = setTimeout(() => {
      func.apply(this,args) // 用apply改变了谁来调func也就是this指向refresh
    }, delay);
  }
}


// 正则表达式是干什么的？ 字符串匹配
export function formatDate(date, fmt) {
  // y+ -> 1个或者多个y
  // y* -> 0个或者多个y
  // y? -> 0个或者1个y
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};