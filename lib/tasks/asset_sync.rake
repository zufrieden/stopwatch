Rake::Task['assets:precompile'].enhance do
  AssetSync.sync rescue nil
end

Rake::Task["assets:precompile:nondigest"].enhance do
  AssetSync.sync rescue nil
end

