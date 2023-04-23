
class EnvironmentVariableError extends Error {
    constructor(variable: string) {
        super(`Environment variable ${variable} is not configured`)
    }
}

class EnvironmentVariableTypeError extends Error {
    constructor(variable: string) {
        super(`Environment variable ${variable} has wrong type`)
    }
}

interface Config {
    JWT_SECRET: string,
    MONGO_ROOT_USER: string,
    MONGO_ROOT_PASSWORD: string,

    PORT?: number,
}

export function checkEnvironmentVariables() {
    checkVariable("JWT_SECRET", true, "string")
    checkVariable("MONGO_ROOT_USER", true, "string")
    checkVariable("MONGO_ROOT_PASSWORD", true, "string")

    checkVariable("PORT", false, "number")
}

function checkVariable(variableName: string, required: boolean, type: "string" | "number") {
    if (process.env[variableName]) {
        if (type == "number" && !Number(process.env[variableName])) throw new EnvironmentVariableTypeError(variableName)
    } else {
        if (required) {
            throw new EnvironmentVariableError(variableName)
        }
    }
}


let configuration: Config = {
    JWT_SECRET: process.env.JWT_SECRET!,
    MONGO_ROOT_USER: process.env.MONGO_ROOT_USER!,
    MONGO_ROOT_PASSWORD: process.env.MONGO_ROOT_PASSWORD!,

}

// add optional environment variables to configuration object like this
if (process.env.PORT) configuration.PORT = Number(process.env.PORT)

export default configuration
