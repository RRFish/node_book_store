class BookStoreResponse {
  status: string;
  data?: any;
  code: number;
  constructor (status:string, data?:any, code = 200) {
    this.status = status;
    this.data = data;
    this.code = code;
  }
}

export {
  BookStoreResponse
};