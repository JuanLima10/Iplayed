export function redirectAuth() {
  document.cookie = `redirect_to=${window.location.pathname}; Path=/;`
  window.location.href = `${process.env.NEXT_PUBLIC_WEB_URL}/auth`
}
