import airflux from "airflux";

export default {
    login: new airflux.Action().asFunction,
    logout: new airflux.Action().asFunction
};
