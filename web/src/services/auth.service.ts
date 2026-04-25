export async function redirectAuth() {
  document.cookie = `redirect_to=${window.location.pathname}; Path=/;`
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ping`).catch(
    () => {}
  )
  console.log(response)
  return
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/discord`
}
