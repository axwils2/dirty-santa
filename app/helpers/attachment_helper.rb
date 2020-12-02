module AttachmentHelper
  include Rails.application.routes.url_helpers

  def attachment_url(attachment)
    return if attachment.blank?

    Rails.application.routes.url_helpers.rails_blob_url(
      attachment.blob, 
      { only_path: true }
    )
  end
end