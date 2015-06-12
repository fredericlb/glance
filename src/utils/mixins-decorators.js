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

export function firebaseEvents(service, ref, targetProperty) {
  return function(klass) {
    Object.defineProperty(klass, "_firebaseRef", {
      writable: true
    });

    var onChildAdded = function(snapshot) {
      let val = snapshot.val();
      val.$fbKey = snapshot.key();
      this[targetProperty].push(val);

      this.publishState();
    };

    klass.prototype.onStartChannel = function(){
      if (!this._firebaseRef) {
        this._firebaseRef = service.getRefFor(ref);
        this._firebaseBoundChildAddedListener = onChildAdded.bind(this);
        this._firebaseRef.on("child_added", this._firebaseBoundChildAddedListener);
      }
    };

    klass.prototype.onStopChannel = function() {
      if (this._firebaseRef !== null) {
        this._firebaseRef.off(this._firebaseBoundChildAddedListener);
        this._firebaseRef = null;
        this.publishState();
      }
    };

  };
}
