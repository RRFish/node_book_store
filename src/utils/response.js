class BookStoreResponse {

  constructor (status, data, code = 200) {
    this.status = status;
    this.data = data;
    this.code = code;
  }
}

module.exports = {
  BookStoreResponse
};