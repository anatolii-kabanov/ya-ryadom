export async function callApi(
    method: string, url: string, path: string, data?: any, token?: string, contentType?: string) {
    const response = await fetch(`${url}${path}`, {
        method,
        mode: 'cors',
        headers: {
            'Content-Type': contentType ? contentType : 'application/json',
            'X-TimeZone-Offset': (new Date()).getTimezoneOffset().toString(),
            'X-Vk-Parameters': window.location.href,
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    try {
        const text = await response.text(); 
        const data = JSON.parse(text); // Try to parse it as json
        return data;
    } catch (error) {
        return null;
    }
}
