module Api
  module V1
    module Players
      class GiftsController < ApplicationController
        def new
          gift = Gift.new(giver: player)

          render json: GiftSerializer.new(gift)
        end

        def show
          gift = player.given_gift

          render json: GiftSerializer.new(gift)
        end

        def create
          gift = Gift.new(gift_params)
          gift.giver = player
          gift.save!

          render json: GiftSerializer.new(gift)
        end

        def update
          gift = player.given_gift
          gift.update!(gift_params)

          render json: GiftSerializer.new(gift)
        end

        private

        def player
          @player ||= Player.find_by(token: params[:player_token])
        end

        def gift_params
          params.permit(:title, :description)
        end
      end
    end
  end
end
