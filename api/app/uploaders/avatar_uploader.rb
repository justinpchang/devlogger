class AvatarUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  def extension_allowlist
    %w[jpg jpeg png]
  end

  process convert: 'png'
  process tags: ['user_avatar']

  version :standard do
    process resize_to_fill: [200, 200]
  end

  version :thumbnail do
    process resize_to_fill: [50, 50]
  end
end
