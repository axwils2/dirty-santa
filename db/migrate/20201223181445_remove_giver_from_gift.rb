class RemoveGiverFromGift < ActiveRecord::Migration[6.0]
  def change
    remove_column :gifts, :giver_id
  end
end
