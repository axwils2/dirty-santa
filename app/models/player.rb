class Player < ApplicationRecord
  has_one :received_gift, class_name: 'Gift', foreign_key: :receiver_id, dependent: :destroy

  has_one_attached :avatar
  has_secure_token :token
end
