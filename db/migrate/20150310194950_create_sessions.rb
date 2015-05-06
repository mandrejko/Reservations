class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.string :date
      t.string :time
      t.integer :current_capacity
      t.integer :max_capacity
      
      t.timestamps
    end
  end
end
