# frozen_string_literal: true

atom_feed language: 'en-US', root_url: 'https://inpublic.dev', url: @url do |feed|
  feed.title @title
  feed.updated @updates.pluck(:created_at).min

  @updates.each do |update|
    feed.entry update, url: 'update.url' do |entry|
      entry.title update.title
      entry.content update.description, type: 'html'

      entry.author { |author| author.name update.project.user.username }
    end
  end
end
