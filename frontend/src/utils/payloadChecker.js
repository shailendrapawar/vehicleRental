//  return false if payload's any entry is  empty
export const payloadChecker = (payload, entity) => {

    if (Object.keys(payload).length == 0) {
        console.log("payload", Object.keys(payload))
        return {
            message: "Invalid payload",
            isSuccess: false
        }
    }
    for (const [key, value] of Object.entries(payload)) {

        console.log(value)

        // null or undefined
        if (value === null || value === undefined) {
            return {
                message: `${entity}'s ${key?.toUpperCase()} is mandatory`,
                isSuccess: false
            };
        }

        // empty string
        if (typeof value === "string" && value.trim() === "") {
            return {
                message: `${entity}'s ${key?.toUpperCase()} is mandatory`,
                isSuccess: false
            };
        }

        // empty array
        if (Array.isArray(value) && value.length === 0) {
            return {
                message: `${entity}'s ${key?.toUpperCase()} is mandatory`,
                isSuccess: false
            };
        }
    }
    return {
        message: ``,
        isSuccess: true
    }
}
