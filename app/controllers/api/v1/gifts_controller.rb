module Api
  module V1
    module Players
      class GiftsController < ApplicationController
        def create
          gift = Gift.create(create_gift_params)

          render json: GiftSerializer.new(gift)
        end

        private

        def create_gift_params
          params.permit(:title, :description, :giver_id, :image)
        end
      end
    end
  end
end
