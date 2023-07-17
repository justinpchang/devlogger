# frozen_string_literal: true
# typed: true

# == Schema Information
#
# Table name: projects
#
#  id          :bigint           not null, primary key
#  description :text
#  homepage    :string
#  name        :string           not null
#  slug        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_projects_on_name     (name) UNIQUE
#  index_projects_on_slug     (slug) UNIQUE
#  index_projects_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Project < ApplicationRecord
  include Subscribable

  belongs_to :user
  has_many :updates, dependent: :destroy

  validates :name, presence: true
  validates :slug,
            presence: true,
            uniqueness: {
              case_sensitive: false,
            },
            length: {
              minimum: 3,
              maximum: 40,
            }
end
