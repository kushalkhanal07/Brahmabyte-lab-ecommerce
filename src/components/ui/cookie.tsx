export function setAuthCookie({email, password}: {email: string, password: string}) {
    const data={email, password}
    document.cookie = `authToken=${JSON.stringify(data)}; path=/; max-age=${60 * 60 * 24 * 7}`;
    

}