// @flow
import request, { snakeCaseKeys } from './ApiClient';

import type { Gift } from 'types/GiftTypes';

// function newGift(token: string): Promise<Gift> {
//   return request({
//     url: `/players/${token}/gifts/new`,
//     method: 'GET'
//   });
// }

function newGift(): Promise<Gift> {
  return request({
    url: `/gifts/new`,
    method: 'GET'
  });
}

function list(): Promise<Array<Gift>> {
  return request({
    url: '/gifts',
    method: 'GET'
  })
}

function fetch(token: string): Promise<Gift> {
  return request({
    url: `/players/${token}/gifts/${token}`,
    method: 'GET'
  });
}

function create(data: $Shape<Gift>): Promise<Gift> {
  return request({
    url: `/gifts`,
    method: 'POST',
    data
  });
}

function update(id: number, data: $Shape<Gift>): Promise<Gift> {
  return request({
    url: `/gifts/${id}`,
    method: 'PATCH',
    data: snakeCaseKeys(data)
  });
}

const GiftService = {
  create,
  list,
  update,
  newGift,
  fetch
};

export default GiftService;
