class GiftSerializer < BaseSerializer
  extend AttachmentHelper

  attributes :id, :title, :description, :receiver_name, :receiver_id, :steal_count_remaining

  attribute :image_url do |gift|
    attachment_url(gift.image)
  end
end
