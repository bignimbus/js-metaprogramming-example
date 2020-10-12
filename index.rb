class ExampleWithMethodMissing
  TABLE_NAME = 'examples'

  def initialize
    @@table_name = TABLE_NAME
  end

  def method_missing(method_name, *args, &block)
    puts "trying to call #{method_name}"
    puts "args:"
    puts args

    # db_lookup method_name
  end

  def db_lookup(method)
    DatabaseConnection.call("select * from #{@@table_name} where etc.")
  end
end
