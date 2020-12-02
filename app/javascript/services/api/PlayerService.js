// @flow
import request from './ApiClient';

import type { Player } from 'types/PlayerTypes';

function fetch(token: string): Promise<Player> {
  return request({
    url: `/players/${token}`,
    method: 'GET'
  });
}

const PlayerService = {
  fetch
};

export default PlayerService;
