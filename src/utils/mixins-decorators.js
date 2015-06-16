import Router from "react-router";
import lo from "lodash";
import Radium from "radium";

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

export function firebaseEvents(service, ref) {
  return function(klass) {
    Object.defineProperty(klass, "_firebaseRef", {
      writable: true
    });

    var onChildAdded = function(snapshot) {
      let val = snapshot.val();
      val.$fbKey = snapshot.key();
      this.list.push(val);
      this.emitChange();
    };

    var onChildUpdated = function(snapshot) {
      let val = snapshot.val();
      let key = snapshot.key();

      let idx = lo.findIndex(this.list,
        (el) => key === el.$fbKey);

      if (idx === -1) {
        return console.error("update has gone terribly wrong");
      }

      val.$fbKey = key;
      this.list[idx] = val;
      this.emitChange();
    };

    var onChildRemoved = function(snapshot) {
      let key = snapshot.key();

      let idx = lo.findIndex(this.list,
        (el) => key === el.$fbKey);

      this.list.splice(idx, 1);
      this.emitChange();
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
      }
    };

  };
}

export function Style(styleObject) {
  return (klass) => {
    var styles = new Map();
    var styleConds = new Map();
    styleConds.set("$root", new Map());
    console.log(styleObject);
    Object.keys(styleObject).forEach((key) => {
      let value = styleObject[key];
      styleConds.set(key, new Map());
      if (value.$applyIf) {
        styleConds.get("$root").set(key, value.$applyIf);
      }
      if (value.$sub) {
        Object.keys(value.$sub).forEach((subKey) => {
          let subValue = styleObject[key].$sub[subKey];
          styleConds.get(key).set(subKey, subValue.$applyIf);
          delete subValue.$applyIf;
          styles.set(`${key}/${subKey}`, subValue);
        });
      }
      delete value.$sub;
      delete value.$applyIf;
      styles.set(key, value);
    });

    klass.prototype._ = function(key) {
      if (!styles.has(key)) {
        console.warn(`Tried to refer a style with unknown key : ${key}`);
      } else if (
          styles.get(key).$applyIf &&
          !styles.get(key).$applyIf(this.state, this.props)) {
        return [{}];
      } else {
        var clss = styles.get(key);
        for (let sub of styleConds.get(key).entries()) {
          if (sub[1].call(this, this.state, this.props)) {
            clss = lo.merge({}, clss, styles.get(`${key}/${sub[0]}`));
          }
        }
        return clss;
      }
    };

    return klass;
  };
}
