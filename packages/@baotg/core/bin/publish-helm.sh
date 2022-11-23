#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const yaml = require('js-yaml');
const program = new Command();

program
  .version('0.0.1')
  .option('--ns <ns>', 'K8s Namespace')
  .option('--chart-dir <token>', 'Chart Dir')
  .option('--helm <token>', 'Helm Command')
  .option('--force', 'Force deploy');

program.parse(process.argv);
const options = program.opts();

const { execSync } = require('child_process');

const pkg = JSON.parse(fs.readFileSync('./package.json').toString());
const chartPath = options.chartDir ?? './k8s/chart';

if (pkg.private == true || pkg.private == "true") {
  console.log(`Package ${pkg.name} is skipped deploy!`);
  return;
}

const setAppVersion = (chartFile, version) => {
  const chart = yaml.load(fs.readFileSync(chartFile, 'utf8'));
  chart.appVersion = chart.version = version;
  chart.name = pkg.name.split('/')[1];
  chart.description = pkg.description;

  const chartYaml = yaml.dump(chart);
  fs.writeFileSync(chartFile, chartYaml);
}

const installOrUpgrade = (chartPath, version) => {
  setAppVersion(`${chartPath}/Chart.yaml`, version);
  const { name } = yaml.load(fs.readFileSync(`${chartPath}/Chart.yaml`, 'utf8'));
  const env = options.ns.split('-')[1];
  const chartName = env === 'production' ? name : `${name}-${env}`;

  const chartList = execSync(`helm list --filter ${chartName} --namespace ${options.ns} --output json`);
  const charts = JSON.parse(chartList.toString());
  const isInstalled = charts.some(chart => chart.name == chartName && chart.app_version == version);
  if (!options.force && isInstalled) {
    return;
  }

  execSync(`${options.helm ?? 'helm'} upgrade --namespace ${options.ns} --install ${chartName} ${chartPath} --values ${chartPath}/values.yaml --values ${chartPath}/values.${env}.yaml --set app-version=${version} --set version=${version} --set servicePackage.name=${pkg.name} --set servicePackage.version=${pkg.version}`, { stdio: 'inherit' });
}

if (!fs.existsSync(`${chartPath}/values`)) {
  installOrUpgrade(chartPath, pkg.version);
  return;
}

// multi values deployment
const dirs = fs.readdirSync(`${chartPath}/values`)
for(const dir of dirs) {
  execSync(`cp ${chartPath}/values/${dir}/Chart.yaml ${chartPath}/Chart.yaml`, { stdio: 'inherit' });
  installOrUpgrade(chartPath, pkg.version);
  execSync(`rm -rf ${chartPath}/Chart.yaml`, { stdio: 'inherit' });
}

