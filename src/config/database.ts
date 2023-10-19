import fs from "node:fs/promises";

//@ts-ignore
const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  //@ts-ignore
  select(table, search) {
    //@ts-ignore
    let data = this.#database[table] ?? [];
    if (search) {
      //@ts-ignore
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          //@ts-ignore
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return data;
  }
  //@ts-ignore
  insert(table, data) {
    //@ts-ignore
    if (Array.isArray(this.#database[table])) {
      //@ts-ignore
      this.#database[table].push(data);
    } else {
      //@ts-ignore
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
  //@ts-ignore
  update(table, id, data) {
    //@ts-ignore
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      //@ts-ignore
      this.#database[table][rowIndex] = { id, ...data };
      this.#persist();
    }
  }
  //@ts-ignore
  delete(table, id) {
    //@ts-ignore

    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (rowIndex > -1) {
      //@ts-ignore
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}
