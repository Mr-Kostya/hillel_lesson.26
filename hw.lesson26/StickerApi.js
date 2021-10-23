class StickerApi {
    static URL = "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers";

    static request(uri = "", method = "GET", data) {
        return fetch(`${this.URL}${uri}`, {
            method,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: data ? JSON.stringify(data) : undefined
        }).then((res) => res.json());
    }

    static getList() {
        return this.request();
    }

    static create(data) {
        return this.request("", "POST", data);
    }

    static update(id, data) {
        return this.request(`/${id}`, "PUT", data);
    }

    static delete(id) {
        return this.request(`/${id}`, "DELETE");
    }

}
