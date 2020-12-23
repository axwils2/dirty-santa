module Api
  module V1
    class PlayersController < ApplicationController
      def new
        render json: PlayerSerializer.new(Player.new)
      end

      def create
        player = Player.new(player_params)
        player.save!

        render json: PlayerSerializer.new(player)
      end

      def show
        render json: PlayerSerializer.new(player)
      end

      def update
        player.update!(player_params)

        render json: PlayerSerializer.new(player)
      end

      private

      def player
        @player ||= Player.find_by(token: params[:token])
      end

      def player_params
        params.permit(:name, :email, :game_id)
      end
    end
  end
end
