// @flow
import request from './ApiClient';

function create(token: string, data: *): Promise<{ avatarUrl: string }> {
  return request({
    url: `/players/${token}/avatars`,
    method: 'POST',
    data
  });
}

function update(token: string, data: *): Promise<{ avatarUrl: string }> {
  return request({
    url: `/players/${token}/avatars/${token}`,
    method: 'PATCH',
    data
  });
}

const PlayerAvatarService = {
  create,
  update
};

export default PlayerAvatarService;
