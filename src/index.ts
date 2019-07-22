import fetch from "node-fetch";
import { ixcStringify } from "./stringify";

class IXCAPI {
  constructor(public url = "", public username = "", public password = "") {}

  // Authorization header value.
  get auth() {
    let userpass = `${this.username}:${this.password}`;
    let base64 = Buffer.from(userpass).toString("base64");
    return `Basic ${base64}`;
  }

  async selectByID(form: string, id: string | number) {
    let registros = await this.select(form, {
      qtype: `${form}.id`,
      oper: "=",
      query: id
    });
    return registros[0];
  }

  async select(form: string, params: any) {
    let path = `/webservice/v1/${form}`;
    let res = await fetch(this.url + path, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        ixcsoft: "listar",
        "Content-Type": "application/json",
        Authorization: this.auth
      }
    });
    if (res.ok === false) {
      throw Error(`Network response was not ok`);
    }
    let json = await res.json();
    if (json.registros && json.registros.length > 0) {
      return json.registros;
    }
    if (json.total == 0) {
      return [];
    }
    throw Error(`Unrecognized response from IXC: ${JSON.stringify(json)}`);
  }

  async insert(form: string, data: any) {
    let path = `/webservice/v1/${form}`;
    let res = await fetch(this.url + path, {
      method: "POST",
      body: ixcStringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: this.auth
      }
    });
    if (res.ok === false) {
      throw Error(`Network response was not ok`);
    }
    let json = await res.json();
    if (json.type !== "success") {
      let error = json.message || JSON.stringify(json);
      throw Error(`Error inserting ${form}: ${error}`);
    }
  }

  async update(form: string, id: string | number, data: any) {
    let path = `/webservice/v1/${form}/${id}`;
    data = { ...data, id };
    let res = await fetch(this.url + path, {
      method: "PUT",
      body: ixcStringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: this.auth
      }
    });
    if (res.ok === false) {
      throw Error(`Network response was not ok`);
    }
    let json = await res.json();
    if (json.type !== "success") {
      let error = json.message || JSON.stringify(json);
      throw Error(`Error updating ${form}: ${error}`);
    }
  }
}

export default IXCAPI;
