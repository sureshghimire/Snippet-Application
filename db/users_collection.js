// in-memory data storage
// this will only persist data for as long as the server in running
const collection = {
    entries: {},
    id: 0,
    get(username) {
        const all = Object.values(this.entries);
        const user = all.find((entry) => entry.username === username);
        return user;
    },
    add(data) {
        const id = this.id;
        data.id = id;

        this.entries[id] = data;

        this.id++;
    }
};

module.exports = collection;
