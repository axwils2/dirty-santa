class AddStealCountRemainingToGifts < ActiveRecord::Migration[6.0]
  def change
    add_column :gifts, :steal_count_remaining, :integer, default: 2
  end
end
