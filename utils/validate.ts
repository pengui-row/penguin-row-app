export class Validation {
    validEmail = (email : string | null) => {
        if (!email) return false
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
    };
    validPhone = (phone : string | null) => {
        if (!phone) return false
        return /^[0-9]{10}$/.test(phone)
    };
}