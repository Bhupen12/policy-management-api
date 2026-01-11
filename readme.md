# Policy Management API

This API provides a set of endpoints to manage insurance policies, including uploading policy data, searching for policies, and aggregating policy information. It also includes features for system monitoring and scheduled messaging.

---

## ✨ Features

-   **Data Upload:** Upload policy data from XLSX/CSV files using worker threads for efficient background processing.
-   **Policy Search:** Search for policies by username.
-   **Policy Aggregation:** Get aggregated policy information for each user.
-   **CPU Monitoring:** Real-time CPU usage tracking with automatic worker process restart if usage exceeds 70%.
-   **Scheduled Messaging:** Schedule messages to be sent at a future date and time.

---

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/)
-   [MongoDB](https://www.mongodb.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Bhupen12/policy-management-api.git
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Set up your environment variables by creating a `.env` file in the root directory.
4.  Start the server:
    ```bash
    npm start
    ```

---

## 🛠️ API Endpoints

### Task 1: Policy Management

#### 1️⃣ Upload XLSX / CSV Data

Upload policy data using a `multipart/form-data` request. This process is handled by a worker thread.

-   **Endpoint:** `POST /api/policies/upload`
-   **Request:** `form-data`
    | Key | Value |
    | :-- | :---- |
    | `file` | your-data-file.csv |
-   **Example:**
    ```bash
    curl -X POST -F "file=@/path/to/your/data-sheet.csv" http://localhost:3000/api/policies/upload
    ```

#### 2️⃣ Search Policy by Username

Search for a policy by the user's email address.

-   **Endpoint:** `GET /api/policies/search`
-   **Query Parameter:** `username`
-   **Example:**
    ```bash
    GET http://localhost:3000/api/policies/search?username=violinhi@att.net
    ```
-   **Response:**
    ```json
    {
      "policies": [
        {
          "_id": "696351fa67f5422c6d72b0a6",
          "policyNumber": "9XP4IPJKS9N1",
          "startDate": "2018-11-01T05:30:10.000Z",
          "endDate": "2019-11-01T05:30:10.000Z",
          "user": {
            "firstName": "James Dalton",
            "email": "violinhi@att.net"
          },
          "category": {
            "name": "Worker's Compensation"
          },
          "company": {
            "name": "Amtrust Group"
          }
        }
      ]
    }
    ```

#### 3️⃣ Aggregate Policies by User

Get an aggregated view of policies for each user.

-   **Endpoint:** `GET /api/policies/aggregate`
-   **Example:**
    ```bash
    GET http://localhost:3000/api/policies/aggregate
    ```
-   **Response:**
    ```json
    [
      {
        "totalPolicies": 1,
        "activePolicies": 0,
        "expiredPolicies": 1,
        "userId": "696354992d5ed34bf60e74bc",
        "firstName": "Kizzie Sanor",
        "email": "stellaau@gmail.com"
      }
    ]
    ```

### Task 2: System & Messaging

#### 1️⃣ CPU Monitoring & Auto Restart

This feature monitors the CPU usage in real-time. If the CPU usage exceeds 70%, the worker process will automatically restart. This is implemented using the Node.js `cluster` module.

#### 2️⃣ Schedule Message API

Schedule a message to be sent at a specific day and time.

-   **Endpoint:** `POST /api/message/schedule`
-   **Request Body:**
    ```json
    {
      "message": "Hello from the future 🚀",
      "day": "2026-01-11",
      "time": "18:28"
    }
    ```
-   **Response:**
    ```json
    {
      "message": "Message scheduled successfully",
      "scheduledAt": "11/1/2026, 6:28:00 pm"
    }
    ```

---

## 🏗️ MongoDB Collections Used

-   `Agent`
-   `User`
-   `Account`
-   `Policy Category (LOB)`
-   `Policy Carrier (Company)`
-   `Policy`

---

## 💻 Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---
