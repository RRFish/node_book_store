class GlobalState {
  state = new Map();

  set (key:string, value:any) {
    this.state.set(key, value);
  }

  get (key:any = undefined) {
    if (key) {
      return this.state.get(key);
    }
    return Object.fromEntries(this.state);
  }

}

const globalState = new GlobalState();

export {
  globalState
};