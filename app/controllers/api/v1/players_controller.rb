module Api
  module V1
    class PlayersController < ApplicationController
      def show
        player = Player.find_by(token: params[:token])

        render json: PlayerSerializer.new(player)
      end
    end
  end
end
