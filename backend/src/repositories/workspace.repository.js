import BaseRepository from './base.repository.js';
import workspaceModel from '../models/workspace.model.js';
import channelModel from '../models/channel.model.js';

class WorkspaceRepository extends BaseRepository {
    constructor() {
        super(workspaceModel, 'description');
    }


}

const workspaceRepository = new WorkspaceRepository();
export default workspaceRepository;