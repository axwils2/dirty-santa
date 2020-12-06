// @flow
import request from './ApiClient';

function create(token: string, data: *): Promise<{ avatarUrl: string }> {
  return request({
    url: `/players/${token}/avatars`,
    method: 'POST',
    data
  });
}

const PlayerAvatarService = {
  create
};

export default PlayerAvatarService;
