module.exports = class Shorten {
    constructor(firebase, warns = true) {
        if (!firebase) {
            throw new Error('Hoped to find a definition for "firebase". (11)');
        }

        if (warns !== false && warns !== true) warns = true;
        if (warns === true) {
            console.log("Shorten-Firebase v2.0.0 inicializado. (1)");
        }

        this.database = firebase.database();
    }

    async set(ref, value) {
        if (!ref || !value || typeof value !== "object") {
            throw new Error(
                "Hoped to find a reference and an value [object] (12). Check the documentation."
            );
        }

        this.database.ref(ref).update(value);
    }

    async update(ref, value) {
        this.set(ref, value);
    }

    async add(ref, value, newValue) {
        if (
            !ref ||
            !value ||
            !newValue ||
            typeof ref !== "string" ||
            typeof value !== "string" ||
            typeof newValue !== "number"
        ) {
            throw new Error(
                "Hoped to find a reference, a property and a value (13). Check the documentation."
            );
        }
        this.database
            .ref(ref)
            .once("value")
            .then(async (snapshot) => {
                if (snapshot.exists()) {
                    let oldValue = snapshot.val()[value]
                        ? snapshot.val()[value]
                        : 0;
                    let data = {
                        [value]: oldValue + newValue,
                    };
                    this.database.ref(ref).update(data);
                } else {
                    let data = {
                        [value]: newValue,
                    };
                    this.database.ref(ref).update(data);
                }
            });
    }

    async delete(ref) {
        if (!ref || typeof ref !== "string") {
            throw new Error(
                "Hoped to find a reference (14). Check the documentation."
            );
        }
        this.database.ref(ref).remove();
    }

    async erase(ref) {
        this.delete(ref);
    }

    async get(ref) {
        if (!ref || typeof ref !== "string") {
            throw new Error(
                "Hoped to find a reference (14). Check the documentation."
            );
        }
        var data = null;
        await this.database
            .ref(ref)
            .once("value")
            .then((snapshot) => {
                if (snapshot.val() && snapshot.val()) {
                    data = snapshot.val();
                } else {
                    data = null;
                }
            });

        return Promise.resolve(data).then((value) => value);
    }

    async getAllData() {
        var data = null;
        await this.database
            .ref("/")
            .once("value")
            .then((snapshot) => {
                if (snapshot.val() && snapshot.val()) {
                    data = snapshot.val();
                } else {
                    data = null;
                }
            });

        return Promise.resolve(data).then((value) => value);
    }

    async search(ref, property) {
        if (
            !ref ||
            (!property &&
                typeof ref !== "string" &&
                typeof property !== "string")
        ) {
            throw new Error(
                "Hoped to find a reference (14). Check the documentation."
            );
        }
        var data = null;
        await this.database
            .ref(ref)
            .once("value")
            .then((snapshot) => {
                if (snapshot.val() && snapshot.val()[property]) {
                    data = snapshot.val()[property];
                } else {
                    data = null;
                }
            });
        return Promise.resolve(data).then((value) => value);
    }

    async latency() {
        let time = Date.now();
        return Math.round(
            await this.database
                .ref("shorten-firebase")
                .once("value")
                .then(() => Date.now() - time)
        );
    }

    async ping() {
        this.latency();
    }
};
