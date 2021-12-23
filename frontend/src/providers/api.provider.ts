import { Axios } from 'axios';
export class APIProvider {
  private apiUrl = process.env.REACT_APP_API_URL;
  private axios: Axios;
  constructor() {
    this.axios = new Axios({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  GET<T>(url: string) {
    return this.axios
      .get<T>(url)
      .then((res) => JSON.parse(res.data as unknown as string) as T);
  }
  POST<T>(url: string, body: { [key: string]: any }) {
    return this.axios
      .post<T>(url, JSON.stringify(body), {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => JSON.parse(res.data as unknown as string) as T);
  }
  DELETE(url: string) {
    return this.axios.delete(url);
  }
}
