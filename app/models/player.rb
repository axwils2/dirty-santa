class Player < ApplicationRecord
  belongs_to :game
  has_one_attached :avatar
end
