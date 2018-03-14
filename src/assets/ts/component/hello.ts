export class Hello {

  static say(): Hello {
    return new Hello();
  }

  private constructor() {
    console.log('Instantiate hello class!');
  }
}
