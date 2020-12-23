module Api
  module V1
    class GiftsController < ApplicationController
      def new
        render json: GiftSerializer.new(Gift.new)
      end

      def create
        gift = Gift.new(gift_params)
        gift.save!

        render json: GiftSerializer.new(gift)
      end

      def index
        gifts = Gift.all
        render json: GiftSerializer.new(gifts)
      end

      # def update
      #   player.update!(player_params)

      #   render json: PlayerSerializer.new(player)
      # end

      private

      def gift
        @gift ||= Gift.find(params[:id])
      end

      def gift_params
        params.permit(:title, :receiver_id)
      end
    end
  end
end
