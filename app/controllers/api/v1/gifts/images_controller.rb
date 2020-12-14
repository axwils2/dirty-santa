module Api
  module V1
    module Gifts
      class ImagesController < ApplicationController
        def create
          gift.image.attach(params[:image])

          render json: { 
            data: {
              attributes: {
                imageUrl: helpers.attachment_url(gift.image)
              }
            }
          }
        end

        def update
          gift.image.purge
          gift.image.attach(params[:image])

          render json: { 
            data: {
              attributes: {
                imageUrl: helpers.attachment_url(gift.image)
              }
            }
          }
        end

        private

        def gift
          @gift ||= Gift.find(params[:gift_id])
        end
      end
    end
  end
end
