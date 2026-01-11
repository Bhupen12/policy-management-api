import cluster from 'cluster';
import { getCpuUsage } from './cpuWatcher.js';
import { startApp } from './app.js';

const CPU_LIMIT = Number(process.env.CPU_LIMIT) || 70;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} running`);

  cluster.fork();

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {
  await startApp();

  setInterval(() => {
    const cpuUsage = getCpuUsage();
    console.log(`CPU Usage: ${cpuUsage}% (PID ${process.pid})`);

    if (cpuUsage >= CPU_LIMIT) {
      console.log(`CPU crossed ${CPU_LIMIT}%. Restarting worker...`);
      process.exit(1);
    }
  }, 5000);
}