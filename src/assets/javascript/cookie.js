
// 设置cookie记录用户状态
// 对cookie的name、value和失效时间的写方法:
export function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setTime(exdate.getTime() + expiredays * 24 * 60 * 60 * 1000);
  console.log(exdate.toUTCString());
  document.cookie = c_name + "=" +  encodeURIComponent(value) +((expiredays==null) ? "": ";expires="+exdate.toUTCString()+"; path=/; domain=localhost");
  console.log(document.cookie);
}
//获取cookie
export function getCookie(c_name){
  if (document.cookie.length>0){//首先查询cookie是否是空的
    let c_start=document.cookie.indexOf(c_name + "=");//检测这个cookie是否存在
    if (c_start!=-1){//如果cookie存在
      c_start=c_start + c_name.length+1;//获取到cookie的值的开始位置
      let c_end=document.cookie.indexOf(";",c_start);//从c_start开始查找";"的存在
      if (c_end==-1) c_end=document.cookie.length;//如果没找到，说明是最后一项
      return decodeURIComponent(document.cookie.substring(c_start,c_end));//把cookie的值拆分出来并且对这个值进行解码
    }
  }
  return "";
}
//删除cookie*
export function delCookie(c_name){
  setCookie(c_name, "", -1);
}
