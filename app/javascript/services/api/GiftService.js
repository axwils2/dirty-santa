// @flow
import request from './ApiClient';

import type { Gift } from 'types/GiftTypes';

function create(data: $Shape<Gift>): Promise<Gift> {
  return request({
    url: "/gifts",
    method: 'POST',
    data
  });
}

function update(id: number, data: $Shape<Gift>): Promise<Gift> {
  return request({
    url: `/gifts/${id}`,
    method: 'PATCH',
    data
  });
}

const GiftService = {
  create,
  update
};

export default GiftService;
