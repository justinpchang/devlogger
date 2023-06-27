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
  extend T::Sig

  belongs_to :user

  validates :name, presence: true, uniqueness: true
  validates :slug, presence: true, uniqueness: true

  after_create :generate_slug

  private

  sig { void }
  def generate_slug
    self.slug = name.parameterize unless slug
  end
end
