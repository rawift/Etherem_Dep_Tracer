# Ethereum Deposit Tracker with Prometheus, Grafana, and Loki Logging
 This project sets up a Node.js application that interacts with Beacon Deposit Contract with Prometheus and Grafana for monitoring, and Loki for logging. You can run the project using Node.js directly or use Docker to containerize and manage the application and its dependencies.
## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Project](#running-the-project)
   - [Option 1: Using Node.js and npm](#option-1-using-nodejs-and-npm)
   - [Option 2: Using Docker](#option-2-using-docker)
4. [Prometheus & Grafana](#prometheus--grafana)
5. [Loki Logging Integration](#loki-logging-integration)
6. [Usage](#usage)
---
## Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v14 or later)
- **npm** (Node.js package manager)
- **Docker** (optional, if you want to run the application with Docker)
---
## Installation
### Option 1: Using Node.js and npm

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/rawift/Etherem_Dep_Tracer.git
   cd Etherem_Dep_Tracer


2.  **Install Dependencies:**
   
     After cloning the repository, install the Node.js dependencies by running:
    ```bash
    npm install

3.  Configure Prometheus and Grafana:

     Ensure you have a prometheus.yml file in your project root to configure Prometheus scraping, in the prometheus.yml replace 172.27.176.1 -> your local machine
     ```bash
    docker compose up
    docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss

4.  Run the Node.js Application:
    ```bash
    npm start

  ### Option 2: Using Docker
  You can also run the application using Docker, which will automatically install dependencies and run all services (Node.js app, Prometheus, Grafana, and Loki).

  1. **Clone the Repository:**

     ```bash
     git clone https://github.com/rawift/Etherem_Dep_Tracer.git
     cd Etherem_Dep_Tracer

  2. Build the Node.js application Docker image:

     ```bash
      docker build -t your-dockerhub-username/hey-nodejs:0.0.1.RELEASE .
  3. Run Docker Compose:

     Start the Node.js app along with Prometheus, Grafana, and Loki using Docker Compose:
     ```bash
      docker-compose up -d


   ## Prometheus & Grafana

- **Prometheus:** Access Prometheus at `http://localhost:9090` after starting the services.
- **Grafana:** Access Grafana at `http://localhost:3000`. The default username and password are `admin` / `admin`.

### Grafana Setup:

1. After logging into Grafana, configure Prometheus as a data source by navigating to **Configuration > Data Sources**.
2. Add **Prometheus** and use `http://prometheus:9090` as the URL.

---

## Loki Logging Integration

Loki is used for collecting and aggregating logs from the Node.js application. Logs are automatically pushed to Grafana via Loki.

### Grafana Loki Setup:

1. **Add Loki as a Data Source:**
   - In Grafana, go to **Configuration > Data Sources**.
   - Add **Loki** and use `http://loki:3100` as the URL.

2. **View Logs:**
   - Use **Explore** in Grafana to view logs aggregated by Loki.

---

## Prometheus & Grafana

- **Prometheus:** Access Prometheus at `http://localhost:9090` after starting the services.
- **Grafana:** Access Grafana at `http://localhost:3000`. The default username and password are `admin` / `admin`.

### Grafana Setup:

1. After logging into Grafana, configure Prometheus as a data source by navigating to **Configuration > Data Sources**.
2. Add **Prometheus** and use `http://prometheus:9090` as the URL.

---

## Loki Logging Integration

Loki is used for collecting and aggregating logs from the Node.js application. Logs are automatically pushed to Grafana via Loki.

### Grafana Loki Setup:

1. **Add Loki as a Data Source:**
   - In Grafana, go to **Configuration > Data Sources**.
   - Add **Loki** and use `http://loki:3100` as the URL.

2. **View Logs:**
   - Use **Explore** in Grafana to view logs aggregated by Loki.

---

## Usage

Once the setup is complete, you can monitor your application's metrics and logs through Grafana dashboards and explore logs using Loki.

- **Node.js App:** Visit `http://localhost:8000` to access the application. You can see deposit data and get alerts on this page.
- **Grafana:** Visit `http://localhost:3000` to view the dashboards and logs.
- **Prometheus:** Visit `http://localhost:9090` for Prometheus metrics.

For real-time alerts and updates, join our [Telegram group](https://t.me/eth_dep_alert).



 
