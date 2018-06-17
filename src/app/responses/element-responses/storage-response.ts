export class StorageResponse {
  resource: string;
  quantity: number;

  constructor(resource: string, quantity: number) {
    this.resource = resource;
    this.quantity = quantity;
  }
}
