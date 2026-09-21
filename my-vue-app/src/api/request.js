export async function request(baseUrl, endpoint, options = {}) {
    const response = await fetch(`${baseUrl}${endpoint}`, options)

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
    }

    return await response.json()
}