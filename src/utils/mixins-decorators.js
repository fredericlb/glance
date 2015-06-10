import Router from "react-router";

export function Navigation(klass) {
  klass.contextTypes = Router.Navigation.contextTypes;
  [
    "makePath",
    "makeHref",
    "transitionTo",
    "replaceWith",
    "goBack"
  ].forEach(name => klass.prototype[name] = Router.Navigation[name]);
  return klass;
}
