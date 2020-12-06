// @flow
import request from './ApiClient';

import type { Player } from 'types/PlayerTypes';

function fetch(token: string): Promise<Player> {
  return request({
    url: `/players/${token}`,
    method: 'GET'
  });
}

function update(token: string, data: $Shape<Player>): Promise<Player> {
  return request({
    url: `/players/${token}`,
    method: 'PATCH',
    data
  });
}

const PlayerService = {
  fetch,
  update
};

export default PlayerService;
