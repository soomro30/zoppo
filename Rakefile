desc "Run dev"
task :s do
  puts "Running jekyll @ http://localhost:4000"
  puts "webpack is watching"
  `bundle exec jekyll s -w --host=0.0.0.0 --livereload`
end

desc "Build"
task :build do
  system("bundle exec jekyll b --verbose")
end

desc "Webpack watch"
task :webpack do
  `npm run webpack`
end

desc "Clear all cache"
task :cache do
  # desc "Clears all files and directories in tmp/cache"
  task :clear do
    FileUtils.rm_rf(Dir['tmp/cache/[^.]*'])
  end
end

desc "Run all dev tasks"
task :start do
  threads = []
  %w{s webpack}.each do |t|
    threads << Thread.new(t) do |my_task|
      Rake::Task[my_task].invoke
    end
  end
  threads.each { |thread| thread.join }
end
