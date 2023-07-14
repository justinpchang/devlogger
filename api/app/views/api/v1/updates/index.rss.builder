# frozen_string_literal: true

xml.instruct! :xml, version: '1.0'
xml.rss version: '2.0' do
  xml.channel do
    xml.title @title
    xml.description ''
    xml.link @url

    @updates.each do |update|
      xml.item do
        xml.title update.title
        xml.description update.description
        xml.pubDate update.created_at.to_fs(:rfc822)
        xml.link @url # TODO: Add dedicated update pages
        xml.guid @url
      end
    end
  end
end
