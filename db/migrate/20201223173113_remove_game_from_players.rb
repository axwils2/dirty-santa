class RemoveGameFromPlayers < ActiveRecord::Migration[6.0]
  def change
    remove_column :players, :game_id
  end
end
