// @flow
import request from './ApiClient';

function create(id: number, data: *): Promise<{ imageUrl: string }> {
  return request({
    url: `/gifts/${id}/images`,
    method: 'POST',
    data
  });
}

function update(id: number, data: *): Promise<{ imageUrl: string }> {
  return request({
    url: `/gift/${id}/images/${id}`,
    method: 'PATCH',
    data
  });
}

const GiftImageService = {
  create,
  update
};

export default GiftImageService;
