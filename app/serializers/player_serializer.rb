class PlayerSerializer < BaseSerializer
  extend AttachmentHelper

  attributes :id, :name, :email, :token

  attribute :avatar_url do |player|
    attachment_url(player.avatar)
  end
end
