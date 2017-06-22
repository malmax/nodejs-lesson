export default {
  host: 'localhost',
  port: 8080,
  get baseUrl() {
    return `http://${this.host}:${this.port}`;
  },
};
