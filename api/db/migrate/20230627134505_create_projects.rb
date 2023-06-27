class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.string :homepage
      t.text :description
      t.references :user, null: false, foreign_key: true

      t.timestamps

      t.index :name, unique: true
      t.index :slug, unique: true
    end
  end
end
