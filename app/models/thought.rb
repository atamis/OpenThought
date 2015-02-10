class Thought < ActiveRecord::Base
  belongs_to :user
  acts_as_taggable
  acts_as_taggable_on :tags

  before_save :set_tags
  before_create :set_tags

  def set_tags
    x = self.body.scan(/#([a-zA-Z]+)/).flatten.map(&:downcase)
    self.tag_list = x.join(', ') unless x == []
  end

  def markdown

    options = {
      autolink: true,
      no_intra_emphasis: true
    }
    renderer = Redcarpet::Render::HTML
    x = Redcarpet::Markdown.new(renderer, options)
    text = self.body.gsub(/#[a-zA-Z]+/) do |tag|
      "<a href=\"/tags/#{tag.gsub("#", '')}\">#{tag}</a>"
    end
    x.render text
  end
end
