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
        gifts = Gift.all.order(:created_at)
        render json: GiftSerializer.new(gifts)
      end

      def update
        gift.update!(gift_params)

        render json: GiftSerializer.new(gift)
      end

      private

      def gift
        @gift ||= Gift.find(params[:id])
      end

      def gift_params
        params.permit(:title, :receiver_id, :steal_count_remaining)
      end
    end
  end
end
