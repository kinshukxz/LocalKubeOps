# 🚀 LocalKubeOps: End-to-End DevOps Project on Minikube

A complete DevOps pipeline deployed locally using Minikube, featuring CI, GitOps, monitoring, and secure container delivery — all without cloud cost.

---

## 📦 Project Structure

<img width="491" alt="image" src="https://github.com/user-attachments/assets/62fa8e24-9e30-405d-816d-74b18d48a96b" />

---

## 🛠️ Tech Stack

| Layer           | Tech Used                                       |
|----------------|--------------------------------------------------|
| App            | React, Node.js, MongoDB                         |
| Containers     | Docker                                          |
| Orchestration  | Kubernetes (Minikube)                           |
| CI/CD          | GitHub Actions + ArgoCD                         |
| GitOps         | ArgoCD (syncs Helm charts from GitHub)          |
| Monitoring     | Prometheus, Grafana, kube-state-metrics         |
| Security       | Trivy (Docker image vulnerability scanning)     |

---

## 🌐 Live Stack Architecture (Local)

Browser → Frontend (React)
↓
Backend (Node.js + Express)
↓
MongoDB (Local)


All services are containerized, deployed to Minikube via Helm, monitored by Prometheus/Grafana, and synced by ArgoCD.

---

## 🚀 Features

- 🔄 GitOps: Auto-sync from GitHub to K8s using ArgoCD
- 🔁 CI: Build & Trivy scan images on every push via GitHub Actions
- 🔍 Monitoring: Pod/node health dashboards via Grafana
- ⚙️ Containerized Microservices with local MongoDB
- 🧪 Secure: Image scanning with Trivy before deployment
- 💸 Zero cloud cost: Everything runs locally via Minikube

---

## ✅ Setup Instructions

> Ensure you have Docker, Minikube, Helm, and kubectl installed.

### 1. Start Minikube

```bash
minikube config set memory 3800
minikube config set cpus 2
minikube start
2. Build Docker Images (inside Minikube)

eval $(minikube docker-env)
docker build -t local/backend:latest ./app/backend
docker build -t local/frontend:latest ./app/frontend
3. Deploy with Helm

cd k8s/helm-chart
helm install localkubeops .
4. Access App

minikube service frontend
5. Access Grafana

kubectl port-forward svc/monitoring-grafana -n monitoring 3001:80
# Open http://localhost:3001
# Login: admin / prom-operator
````

### 📸 Dashboards Preview
````
Kubernetes Pod Metrics

Networking & Node Health

ArgoCD App Sync Status

Prometheus Metrics & Alerts
````

### 📂 GitHub Actions CI
````
Builds backend & frontend Docker images

Runs Trivy scan on each push to main

Integrates seamlessly with ArgoCD GitOps delivery

````

☁️ Optional: Deploy to GKE/EKS for production (for cost consumption I didn't do this )

