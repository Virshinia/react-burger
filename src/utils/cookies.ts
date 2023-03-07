function setCookie(name: string, value: string | boolean, props?: {[name: string] : any}) {
  props = {path: '/', ...props};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }

  document.cookie = updatedCookie;
}


export function saveCookie(data: {refreshToken: string, accessToken: string}){
  data.accessToken = data.accessToken.split('Bearer ')[1];
  const cookies = [
    {name:'refreshToken',value: data.refreshToken},
    {name:'accessToken',value: data.accessToken}]
  ;
  cookies.forEach(cookie => setCookie(cookie.name, cookie.value))
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, false, { expires: -1 });
}
