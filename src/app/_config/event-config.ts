export enum Event {
  REQUEST_FAILED = 'RequestFailed',
  LOGGED_IN = 'LoggedIn',
  LOGGED_OUT = 'LoggedOut',
  DISPLAY_WORLD = 'DisplayWorld',
  DISPLAY_CITY = 'DisplayCity',
  DISPLAY_CASTLE = 'DisplayCastle',
  DISPLAY_STRUCTURE_DETAILS = 'DisplayStructureDetails',
  LOAD_CITY = 'LoadCity',
  LOAD_WORLD = 'LoadWorld',
  LOAD_CASTLE = 'LoadCastle',
  LOAD_STRUCTURE_DETAILS = 'LoadStructureDetails',
  CHANGE_ACTIVE_CITY = 'ChangeActiveCity',
  CHANGE_AND_DISPLAY_ACTIVE_CITY = 'ChangeAndDisplayActiveCity',
  ACTIVE_CITY_CHANGED = 'ActiveCityChanged',
  CITY_TILE_SELECTED = 'CityTileSelected',
  STORAGE_UPDATE = 'StorageUpdate',
  NEW_CITY_BUILT = 'NewCityBuilt'
}
