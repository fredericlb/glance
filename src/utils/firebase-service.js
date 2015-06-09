import Firebase from "firebase";

class FirebaseService {

	constructor(appName) {
		this.appName = appName;
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

}


export default new FirebaseService("io-glance");
