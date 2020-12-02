class AddTokenToGame < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :token, :string
    add_index :games, :token, unique: true
  end
end
