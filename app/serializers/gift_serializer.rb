class GiftSerializer < BaseSerializer
  extend AttachmentHelper

  attributes :title, :description

  attribute :image_url do |gift|
    attachment_url(gift.image)
  end
end
