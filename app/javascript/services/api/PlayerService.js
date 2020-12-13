// @flow
import request, { snakeCaseKeys } from './ApiClient';

import type { Player } from 'types/PlayerTypes';

function newPlayer(params: { game_token: string }): Promise<Player> {
  return request({
    url: '/players/new',
    method: 'GET',
    params
  });
};

function fetch(token: string): Promise<Player> {
  return request({
    url: `/players/${token}`,
    method: 'GET'
  });
}

function create(data: $Shape<Player>): Promise<Player> {
  return request({
    url: '/players',
    method: 'POST',
    data: snakeCaseKeys(data)
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
  update,
  newPlayer,
  create
};

export default PlayerService;
