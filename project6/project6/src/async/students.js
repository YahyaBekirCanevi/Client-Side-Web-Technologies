export default async function fetchAsync(url, method, data) {
    let response = await fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data === null ? undefined : JSON.stringify(data)
    })
    return response
}