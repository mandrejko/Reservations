class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.belongs_to :user, index: true
      t.belongs_to :session, index: true
      t.timestamps
    end
  end
end
