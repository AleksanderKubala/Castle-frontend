import {ImageMapperService} from '../services/internal-services/image-mapper-service/image-mapper.service';
import {StorageResponse} from '../responses/element-responses/storage-response';
import {Requirement} from '../classes/requirement';
import {Resource} from '../classes/resource';

export interface Storing {

  fillStorage (imageMapper: ImageMapperService, storages: StorageResponse[]);
  updateStorage (storages: StorageResponse[]);
  checkForRequirementsMet(reqs: Requirement[]);
  getStorageByResource(res: Resource): number;
  getStorage();
}
