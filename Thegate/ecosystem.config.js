module.exports = {
  apps : [
  {
    name: 'gate-pgn',
    script: 'gate-pgn.js',
    instances: 1,
    autorestart: true,
    watch: false,
    log_file:"log/thegate.log",
    error_file: "log/error.log",
    out_file: "log/pgn.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss.SSS",
    merge_logs: true,
    max_memory_restart: '1G'
  },
  {
    name: 'gate-callback',
    script: 'gate-callback.js',
    instances: 1,
    autorestart: true,
    watch: false,
    log_file:"log/thegate.log",
    error_file: "log/error.log",
    out_file: "log/callback.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss.SSS",
    merge_logs: true,
    max_memory_restart: '1G'
  },
  {
    name: 'gate-taspen',
    script: 'gate-taspen.js',
    instances: 1,
    autorestart: true,
    watch: false,
    log_file:"log/thegate.log",
    error_file: "log/error.log",
    out_file: "log/taspen.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss.SSS",
    merge_logs: true,
    max_memory_restart: '1G'
  },
  {
    name: 'gate-btnproperty',
    script: 'gate-btnproperty.js',
    instances: 1,
    autorestart: true,
    watch: false,
    log_file:"log/thegate.log",
    error_file: "log/error.log",
    out_file: "log/property.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss.SSS",
    merge_logs: true,
    max_memory_restart: '1G'
  },
  {
    name: 'gate-universitas',
    script: 'gate-universitas.js',
    instances: 1,
    autorestart: true,
    watch: false,
    log_file:"log/thegate.log",
    error_file: "log/error.log",
    out_file: "log/universitas.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss.SSS",
    merge_logs: true,
    max_memory_restart: '1G'
  },
  {
    name: 'gate-bankgaransi',
    script: 'gate-bankgaransi.js',
    instances: 1,
    autorestart: true,
    watch: false,
    log_file:"log/thegate.log",
    error_file: "log/error.log",
    out_file: "log/bankgaransi.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss.SSS",
    merge_logs: true,
    max_memory_restart: '1G'
  },
  {
    name: 'gate-grip',
    script: 'gate-grip.js',
    instances: 1,
    autorestart: true,
    watch: false,
    log_file:"log/thegate.log",
    error_file: "log/error.log",
    out_file: "log/grip.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss.SSS",
    merge_logs: true,
    max_memory_restart: '1G'
  },
  {
    name: 'gate-rumahsakit',
    script: 'gate-rumahsakit.js',
    instances: 1,
    autorestart: true,
    watch: false,
    log_file:"log/thegate.log",
    error_file: "log/error.log",
    out_file: "log/rumahsakit.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss.SSS",
    merge_logs: true,
    max_memory_restart: '1G'
  },
  {
    name: 'gate-dana',
    script: 'gate-dana.js',
    instances: 1,
    autorestart: true,
    watch: false,
    log_file:"log/thegate.log",
    error_file: "log/error.log",
    out_file: "log/dana.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss.SSS",
    merge_logs: true,
    max_memory_restart: '1G'
  },
 {
    name: 'log-browser',
    script: 'log-server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    log_file:"log/thegate.log",
    error_file: "log/error.log",
    out_file: "log/log-browser.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss.SSS",
    merge_logs: true,
    max_memory_restart: '1G'
  }
  ],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
