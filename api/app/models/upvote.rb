# frozen_string_literal: true

# == Schema Information
#
# Table name: upvotes
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  update_id  :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_upvotes_on_update_id  (update_id)
#  index_upvotes_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (update_id => updates.id)
#  fk_rails_...  (user_id => users.id)
#
# typed: true

class Upvote < ApplicationRecord
  belongs_to :user
end
