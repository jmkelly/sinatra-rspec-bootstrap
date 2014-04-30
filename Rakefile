require "rspec/core/rake_task"
require "sequel"
require "sequel/extensions/migration"
require "yaml"

desc "Run those specs"
    task :spec do
        RSpec::Core::RakeTask.new(:spec) do |t|
            t.rspec_opts = %w{--colour --format progress}
    end
end
    

namespace :db do
  MIGRATIONS_DIR = "db/migrate"
  env = ENV["RACK_ENV"] || "development"

  config = File.expand_path("../config/database.yaml", __FILE__)
  DB = Sequel.connect(YAML.load_file(config)[env])

  desc "Migrate the database"
  task :migrate do
    Sequel::Migrator.apply(DB, MIGRATIONS_DIR) 
  end

  desc "Nuke the database (drop all tables)"
  task :nuke do 
    DB.tables.each do |table|
      DB.run("DROP TABLE #{table}")
    end
  end

  desc "Reset the database" do
  task :reset => [:nuke, :migrate]
  end

  desc "Create a migration"
  task :create_migration do
    name = ENV['NAME']
    abort("no NAME specified. use `rake db:create_migration NAME=create_users`") if !name

    migrations_dir = File.join("db", "migrate")
    version = Time.now.utc.strftime("%Y%m%d%H%M%S") 
    filename = "#{version}_#{name}.rb"
    migration_name = name.gsub(/_(.)/) { $1.upcase }.gsub(/^(.)/) { $1.upcase }

    FileUtils.mkdir_p(migrations_dir)

    open(File.join(migrations_dir, filename), 'w') do |f|
      f << (<<-EOS).gsub("      ", "")
      Sequel.migration do
      up do
      end

      down do
      end
      end
      EOS
    end
  end
end
