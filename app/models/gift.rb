class Gift < ApplicationRecord
  belongs_to :receiver, class_name: 'Player', optional: true

  has_one_attached :image

  def receiver_name
    return if receiver.blank?

    receiver.name
  end
end
