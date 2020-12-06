module Api
  module V1
    class PlayersController < ApplicationController
      def show
        render json: PlayerSerializer.new(player)
      end

      def update
        player.update(player_params)
        player.avatar.attach(params[:avatar]) if params[:avatar]

        render json: PlayerSerializer.new(player)
      end

      private

      def player
        @player ||= Player.find_by(token: params[:token])
      end

      def player_params
        params.permit(:name, :email)
      end
    end
  end
end
