export const baseUrl = "http://localhost:3001"

export const authLogin = async (values) => {
    const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
    })

    return await res.json()
}

export const signup = async (formData) => {

    const res = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        body: formData
    })

    return await res.json()
}