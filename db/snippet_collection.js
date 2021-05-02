// in-memory data storage
// this will only persist data for as long as the server in running
const db = {
    entries: {},
    id: 0,
    all() {
        return Object.values(this.entries);
    },
    get(id) {
        if (this.entries[id]) {
            return this.entries[id];
        }

        throw new Error(`No snippits exists for ${id}.`);
    },
    add(data) {
        const id = this.id;

        data.id = id;
        this.entries[id] = data;

        this.id++;

        return this.entries[id];
    }
};

module.exports = db;
