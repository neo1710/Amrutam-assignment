# SCALING.md

## Goal  
Scale the Ayurvedic consultation platform to **5,000 appointments/day** across **1,000 doctors**, while keeping the system reliable, performant, and secure.  

---

## 1. API Layer  
- **Load Balancing**: Use Nginx/HAProxy or a cloud load balancer to distribute traffic across multiple Node.js instances.  
- **Horizontal Scaling**: Run multiple stateless Express servers (containerized with Docker, orchestrated via Kubernetes/ECS).  
- **Rate Limiting**: Protect APIs with middleware (e.g., `express-rate-limit` or API Gateway throttling) to prevent abuse.  
- **Caching**:  
  - Use Redis for caching frequent queries (e.g., doctor list, availability slots).  
  - Cache OTP verification attempts to reduce MongoDB lookups.  

---

## 2. Database (MongoDB)  
- **Sharding**: Distribute data across shards by `doctor_id` or appointment `date` to handle high write throughput.  
- **Indexes**: Create indexes on `doctor_id`, `specialization`, and `slot_time` for fast lookups.  
- **Replica Sets**: Use MongoDB Atlas with replicas for high availability and failover.  
- **Connection Pooling**: Tune MongoDB driver pool size for high concurrency.  
- **Data Consistency**: Use transactions (MongoDB supports multi-document transactions) to prevent double-bookings.  

---

## 3. Booking Flow (High Concurrency)  
- **Slot Locking**:  
  - Store temporary slot locks in Redis with TTL = 5 minutes.  
  - If user confirms (OTP), finalize appointment in MongoDB.  
  - If not, slot auto-expires.  
- **Idempotency Keys**: Use unique keys per booking request to prevent duplicate bookings from retries.  

---

## 4. Architecture & Services  
- **Microservices Approach** (future evolution):  
  - Auth Service (JWT, refresh tokens).  
  - Doctor Service (availability, schedule).  
  - Booking Service (appointments, cancellations).  
  - Notification Service (email/SMS for OTP, reminders).  
- **Event-Driven System**: Use Kafka or RabbitMQ for handling slot-release events, notifications, and audit logs.  

---

## 5. Observability & Reliability  
- **Monitoring**: Use Prometheus + Grafana or Datadog to track API latency, failed bookings, and availability checks.  
- **Logging**: Centralized logging with ELK stack (Elasticsearch, Logstash, Kibana).  
- **Error Handling**: Graceful fallbacks (retry failed bookings, notify user of issues).  

---

## 6. Deployment Strategy  
- **CI/CD**: Use GitHub Actions for testing and automated deployments.  
- **Hosting**:  
  - Backend on Render/Heroku/Vercel Edge Functions.  
  - MongoDB on Atlas with replication and sharding enabled.  
- **Scaling**: Set autoscaling rules (CPU/memory thresholds) to spin up/down servers dynamically.  

---

## 7. Security Considerations  
- Encrypt sensitive data (user PII, medical history).  
- HTTPS/TLS everywhere.  
- Role-based access (patient, doctor, admin).  
- JWT expiration + refresh tokens for long sessions.  

---

## 8. Future Evolution  
- Mobile app integration (React Native/Flutter).  
- AI-powered doctor recommendations (e.g., based on symptoms).  
- Video consultation integration (WebRTC or Zoom SDK).  
- Multi-language support for regional users.  

---
