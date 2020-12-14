class GiftSerializer < BaseSerializer
  extend AttachmentHelper

  attributes :id, :title, :description

  attribute :image_url do |gift|
    attachment_url(gift.image)
  end
end
