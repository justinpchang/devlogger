class AddNameAndWebsiteToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :name, :string, nil: false
    add_column :users, :website, :string
    change_column_null :users, :username, false
  end
end
