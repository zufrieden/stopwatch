Rake::Task['assets:precompile'].enhance do
  AssetSync.sync
end

Rake::Task["assets:precompile:nondigest"].enhance do
  AssetSync.sync
end

