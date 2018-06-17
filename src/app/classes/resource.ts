export class Resource {

  name: string;
  plunderable: boolean;
  image: string;

  constructor(name: string, plunderable: boolean) {
    this.name = name;
    this.plunderable = plunderable;
  }
}
