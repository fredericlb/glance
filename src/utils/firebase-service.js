import Firebase from "firebase";

class FirebaseService {

	constructor(appName) {
		this.appName = appName;
		this.baseUrl = `https://${appName}.firebaseio.com`;
		this.ref = new Firebase(`https://${appName}.firebaseio.com`);
	}

	login(options) {
		return new Promise((resolve, reject) => {
			this.ref.authWithPassword({
				email: options.email,
				password: options.password
			}, (err, authData) => {
				if (err) {
					return reject(err);
				} else {
					return resolve(authData);
				}
			});
		});
	}

	logout() {
		this.ref.unauth();
	}

	getRefFor(path) {
		return this.ref.child(path);
	}

	createUser(login, password) {
		return new Promise((resolve, reject) => {
			this.ref.createUser({
				email: login,
				password: password
			}, (err, data) => {
				if (err) {
					return reject(err);
				} else {
					return resolve(data);
				}
			});
		});
	}

}


export default new FirebaseService("io-glance");
