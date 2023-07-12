# frozen_string_literal: true
# typed: true

module Subscribable
  extend ActiveSupport::Concern

  included do
    has_many :subscriptions, as: :subscribable, dependent: :destroy
    has_many :subscribers, through: :subscriptions, source: :user
  end
end
