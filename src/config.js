export default {
  host: 'localhost',
  port: 8091,
  get baseUrl() {
    return `http://${this.host}:${this.port}`;
  },
};
