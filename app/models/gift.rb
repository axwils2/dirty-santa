class Gift < ApplicationRecord
  belongs_to :giver, class_name: 'Player'
  belongs_to :receiver, class_name: 'Player', optional: true

  has_one_attached :image
end
