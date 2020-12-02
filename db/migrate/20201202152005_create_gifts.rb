class CreateGifts < ActiveRecord::Migration[6.0]
  def change
    create_table :gifts do |t|
      t.string :title
      t.string :description
      t.references :giver, null: false, index: true, foreign_key: { to_table: :players }
      t.references :receiver, index: true, foreign_key: { to_table: :players }

      t.timestamps
    end
  end
end
