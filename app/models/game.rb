class Game < ApplicationRecord
  has_many :players
  has_one :game_state
end
