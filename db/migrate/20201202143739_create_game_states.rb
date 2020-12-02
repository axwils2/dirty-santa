class CreateGameStates < ActiveRecord::Migration[6.0]
  def change
    create_table :game_states do |t|
      t.references :game, null: false, foreign_key: true
      t.jsonb :state

      t.timestamps
    end
  end
end
