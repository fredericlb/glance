import Router from "react-router";
import lo from "lodash";

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

    var onChildUpdated = function(snapshot) {
      let val = snapshot.val();
      let key = snapshot.key();

      let idx = lo.findIndex(this[targetProperty],
        (el) => key === el.$fbKey);

      if (idx === -1) {
        return console.error("update has gone terribly wrong");
      }

      val.$fbKey = key;
      this[targetProperty][idx] = val;
      this.publishState();
    };

    var onChildRemoved = function(snapshot) {
      let key = snapshot.key();

      let idx = lo.findIndex(this[targetProperty],
        (el) => key === el.$fbKey);

      this[targetProperty].splice(idx, 1);

      this.publishState();
    };


    klass.prototype.ref = function() {
      return this._firebaseRef;
    };

    klass.prototype.onStartChannel = function(){
      if (!this._firebaseRef) {
        this._firebaseRef = service.getRefFor(ref);
        this._firebaseBoundChildAddedListener = onChildAdded.bind(this);
        this._firebaseBoundChildUpdatedListener = onChildUpdated.bind(this);
        this._firebaseBoundChildRemovedListener = onChildRemoved.bind(this);
        this._firebaseRef.on("child_added",
          this._firebaseBoundChildAddedListener);
        this._firebaseRef.on("child_changed",
          this._firebaseBoundChildUpdatedListener);
        this._firebaseRef.on("child_removed",
          this._firebaseBoundChildRemovedListener);
      }
    };

    klass.prototype.onStopChannel = function() {
      if (this._firebaseRef !== null) {
        this._firebaseRef.off("child_added",
          this._firebaseBoundChildAddedListener);
        this._firebaseRef.off("child_changed",
          this._firebaseBoundChildUpdatedListener);
        this._firebaseRef.off("child_removed",
          this._firebaseBoundChildRemovedListener);
        this._firebaseRef = null;
        this.publishState();
      }
    };

  };
}
