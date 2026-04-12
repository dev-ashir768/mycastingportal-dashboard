module.exports = {
  apps: [
    {
      name: "mycastingportal-dashboard",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      instances: 1,     
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      }
    }
  ]
}