export function validEmail(email : string | null) {
    if (!email) return false
    return /\S+@\S+\.\S+/.test(email)
}