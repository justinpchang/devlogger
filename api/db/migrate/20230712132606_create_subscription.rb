class CreateSubscription < ActiveRecord::Migration[7.0]
  def change
    create_table :subscriptions do |t|
      t.string :subscribable_type, null: false
      t.bigint :subscribable_id, null: false

      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :subscriptions, %i[subscribable_type subscribable_id], unique: true
  end
end
