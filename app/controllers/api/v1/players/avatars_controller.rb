module Api
  module V1
    module Players
      class AvatarsController < ApplicationController
        def create
          player.avatar.attach(params[:avatar])

          render json: { 
            data: {
              attributes: {
                avatarUrl: helpers.attachment_url(player.avatar)
              }
            }
          }
        end

        def update
          player.avatar.purge
          player.avatar.attach(params[:avatar])

          render json: { 
            data: {
              attributes: {
                avatarUrl: helpers.attachment_url(player.avatar)
              }
            }
          }
        end

        private

        def player
          @player ||= Player.find_by(token: params[:player_token])
        end
      end
    end
  end
end
