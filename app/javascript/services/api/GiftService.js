// @flow
import request from './ApiClient';

import type { Gift } from 'types/GiftTypes';

function newGift(token: string): Promise<Gift> {
  return request({
    url: `/players/${token}/gifts/new`,
    method: 'GET'
  });
}

function fetch(token: string): Promise<Gift> {
  return request({
    url: `/players/${token}/gifts`,
    method: 'GET'
  });
}

function create(token: string, data: $Shape<Gift>): Promise<Gift> {
  return request({
    url: `/players/${token}/gifts`,
    method: 'POST',
    data
  });
}

function update(token: string, data: $Shape<Gift>): Promise<Gift> {
  return request({
    url: `/players/${token}/gifts/${token}`,
    method: 'PATCH',
    data
  });
}

const GiftService = {
  create,
  update,
  newGift,
  fetch
};

export default GiftService;
