import os from 'os';

const CPU_LIMIT = 70;

let previousCpuInfo = os.cpus();

function getCpuUsage() {
    const currentCpuInfo = os.cpus();
    let totalIdleDiff = 0;
    let totalTickDiff = 0;

    for (let i = 0; i < currentCpuInfo.length; i++) {
        const prevCpu = previousCpuInfo[i];
        const currCpu = currentCpuInfo[i];
        const prevIdle = prevCpu.times.idle;
        const currIdle = currCpu.times.idle;
        const prevTick = Object.values(prevCpu.times).reduce((a, b) => a + b, 0);
        const currTick = Object.values(currCpu.times).reduce((a, b) => a + b, 0);
        totalIdleDiff += currIdle - prevIdle;
        totalTickDiff += currTick - prevTick;
    }

    previousCpuInfo = currentCpuInfo;

    if (!totalTickDiff) {
        return 0;
    }

    const cpuUsage = 100 - (totalIdleDiff / totalTickDiff) * 100;
    return cpuUsage;
}

setInterval(() => {
    const cpuUsage = getCpuUsage();
    console.log(`CPU Usage: ${cpuUsage}%`);
    if (cpuUsage > CPU_LIMIT) {
        console.warn(`Warning: CPU usage is above ${CPU_LIMIT}%!`);
        process.exit(1);
    }
}, 5000);

export default getCpuUsage;