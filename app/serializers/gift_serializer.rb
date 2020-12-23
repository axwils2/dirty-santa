class GiftSerializer < BaseSerializer
  extend AttachmentHelper

  attributes :id, :title, :description, :receiver_name

  attribute :image_url do |gift|
    attachment_url(gift.image)
  end
end
