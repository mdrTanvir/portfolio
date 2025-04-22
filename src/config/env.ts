import {process} from "std-env";

const env = process.env.NODE_ENV

const isProduction = () => {
    return env === 'production'
}

export default isProduction