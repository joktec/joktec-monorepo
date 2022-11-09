# The Jobhop Microservice Solution

## I/ Run *Infrastructure* services
make init-typescript
make dev

make dev service=user

## II/ Start the project with *Tye* [Recomended]
## III/ More information
## IV/ Contributors
* [Jobhop Team]

# Integrate into CI / CD

1. Add a new CI job at the end of `.gitlab-ci.yaml`

```
<job_name>:
  stage: aio
  variables:
    SERVICE_DIR: <service_dir>
    SERVICE_NAME: <service_name>
  script:
    - !reference [.build, script]
    - !reference [.test, script]
    - !reference [.deploy, script]
  rules:
    - !reference [.default_rules, rules]
  environment:
    name: ${CI_COMMIT_BRANCH}/${SERVICE_NAME}
```
If **SERVICE_DIR** is `src/microservices`, omit it in CI job's variables

For example, check these CI jobs

* [jobseeker-gateway](https://gitlab.com/jobhopvn/backend/central-admin-microservices/-/blob/develop/.gitlab-ci.yml#L45-57)

* [lucky-spin-service](https://gitlab.com/jobhopvn/backend/central-admin-microservices/-/blob/develop/.gitlab-ci.yml#L59-70)

2. Add Kubernetes configuration values file into **SERVICE_DIR/deploy**

File format: **eks-values.*<environment\>*.yaml**

*<environment\>* must be one of these **["dev", "staging", "prod"]**

**Gateway template**
```
fullnameOverride: <service_name>-gateway

args: <command_to_start>

extraEnvVars:
  - name: JWT_TOKEN_SECRET
    value: JWTMrJobhopSecretKey
  - name: JWT_TOKEN_EXPIRES
    value: "30"

livenessProbe:
  path: <healthcheck_path>

readinessProbe:
  path: <healthcheck_path>

containerSecurityContext:
  enabled: false

podSecurityContext:
  enabled: false

ingress:
  enabled: true
  ingressClassName: alb
  pathType: Prefix
  hostname: <public_api_domain>
  path: /
  annotations:
    alb.ingress.kubernetes.io/ssl-redirect: "443"
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 80}, {"HTTPS":443}]'
    alb.ingress.kubernetes.io/success-codes: "200,404"
    alb.ingress.kubernetes.io/healthcheck-path: <healthcheck_path>
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/group.name: <eks_cluster_name>
    alb.ingress.kubernetes.io/certificate-arn: <jobhopin_acm_arn>
```

**Service template**
```
fullnameOverride: <service_name>-service

args: <command_to_start>

extraEnvVars:
  - name: JWT_TOKEN_SECRET
    value: JWTMrJobhopSecretKey
  - name: JWT_TOKEN_EXPIRES
    value: "30"

livenessProbe:
  enabled: false --> disable healthcheck temporarily
  path: <healthcheck_path>

readinessProbe:
  enabled: false --> disable healthcheck temporarily
  path: <healthcheck_path>

containerSecurityContext:
  enabled: false

podSecurityContext:
  enabled: false
```

NOTE: Adding environment variables, **value** field is forced to be in string format. That means
* value is *integer* => put in double quotes ""
* value is *string* => put in double quotes "" if there are whitespaces

For example, check these `eks-values.dev.yaml` files

* [jobseeker-gateway](https://gitlab.com/jobhopvn/backend/central-admin-microservices/-/blob/develop/src/gateways/jobseeker/deploy/eks-values.dev.yaml)

* [lucky-spin-service](https://gitlab.com/jobhopvn/backend/central-admin-microservices/-/blob/develop/src/microservices/lucky-spin/deploy/eks-values.dev.yaml)


# Access to EKS cluster

Prerequisite:
  * [kubectl CLI](https://kubernetes.io/docs/tasks/tools/#kubectl)
  * [aws CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

1. Get EKS cluster credentials by runnig AWS CLI command
```
aws eks --region ap-southeast-1 update-kubeconfig --name <cluster_name> --profile dev-readonly
```
NOTE: With `dev-readonly` profile, you're read-only user in EKS cluster (e.g. check resources status, check log of pod resource,...)

2. Use kubectl CLI to check pod (container)
```
kubectl -n app get pods --> List pods in app namespace
kubectl -n app logs <pod_name> --> Get logs from <pod_name>
```

# Microservice databases & users
- user
- main
- job
- cv
- candidate
- gamification
- organization
- activity