import airflux from "airflux";

export default {
    startChannel: new airflux.Action().asFunction,
    stopChannel: new airflux.Action().asFunction,
    save: new airflux.Action().asFunction,
    update: new airflux.Action().asFunction
};
