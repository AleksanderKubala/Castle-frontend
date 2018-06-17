export class SettlementRequest {

  world: number;
  player: string;
  city: number;
  tileRow: number;
  tileColumn: number;

  construcotr(
    world: number,
    player: string,
    city: number,
    tileRow: number,
    tileColumn: number
  ) {
    this.world = world;
    this.player = player;
    this.city = city;
    this.tileRow = tileRow;
    this.tileColumn = tileColumn;
  }
}
