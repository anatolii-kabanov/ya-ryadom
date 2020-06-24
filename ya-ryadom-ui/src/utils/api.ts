export async function callApi(
    method: string, url: string, path: string, data?: any, token?: string, contentType?: string) {
    const response = await fetch(`${url}${path}`, {
        method,
        mode: 'cors',
        headers: {
            'Content-Type': contentType ? contentType : 'application/json',
            'X-TimeZone-Offset': (new Date()).getTimezoneOffset().toString(),
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    return await response.json();
}
