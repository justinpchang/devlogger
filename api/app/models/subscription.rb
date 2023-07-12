# frozen_string_literal: true
# typed: true

# == Schema Information
#
# Table name: subscriptions
#
#  id                :bigint           not null, primary key
#  subscribable_type :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  subscribable_id   :bigint           not null
#  user_id           :bigint           not null
#
# Indexes
#
#  index_subscriptions_on_subscribable_type_and_subscribable_id  (subscribable_type,subscribable_id) UNIQUE
#  index_subscriptions_on_user_id                                (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

class Subscription < ApplicationRecord
  belongs_to :subscribable, polymorphic: true
  belongs_to :user
end
