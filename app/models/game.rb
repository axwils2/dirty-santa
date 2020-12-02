class Game < ApplicationRecord
  has_many :players, dependent: :destroy
  has_many :given_gifts, through: :players

  has_one :game_state, dependent: :destroy
end
