if defined?(AssetSync)
  if Rake::Task.task_defined?("assets:precompile:nondigest")
    Rake::Task["assets:precompile:nondigest"].enhance do
      AssetSync.sync
    end
  else
    Rake::Task["assets:precompile"].enhance do
      AssetSync.sync
    end
  end
end
