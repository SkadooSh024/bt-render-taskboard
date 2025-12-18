# bt-render-taskboard (React + Express + Postgres)

## 1) Overview
Fullstack Taskboard gồm:
- Frontend: React (Vite)
- Backend: Node.js (Express)
- Database: Postgres

Repo này đáp ứng:
- Git/GitHub: branch/merge/conflict + push/clone
- CI/CD: GitHub Actions → deploy Render khi `main` thay đổi
- Docker: chạy local bằng `docker compose up --build`

---

## 2) Live Deploy (Render)
- Web (Render): <RENDER_WEB_URL>
- API Health (Render): <RENDER_API_URL>/api/health

> (Điền link thật của bạn vào 2 chỗ trên)

---

## 3) CI/CD (GitHub Actions → Render)
### 3.1 Secrets cần có
GitHub repo → Settings → Secrets and variables → Actions

- `RENDER_API_DEPLOY_HOOK` : Deploy hook URL của service API trên Render
- `RENDER_WEB_DEPLOY_HOOK` : Deploy hook URL của service WEB trên Render

### 3.2 Workflow
File:
- `.github/workflows/deploy-render.yml`

Trigger:
- push lên nhánh `main`

Pipeline:
- Build frontend (Vite)
- Check backend
- Gọi deploy hook để Render deploy lại

### 3.3 Test CI/CD
- Sửa code → commit → push `main`
- GitHub Actions chạy xanh
- Render có deploy mới
- Mở link Render thấy thay đổi

---

## 4) Run Local with Docker (Dev)
### 4.1 Start
```bash
docker compose up -d --build
docker compose ps
-------------------
Open / Test

Frontend: http://localhost:5173

Backend health: http://localhost:4000/api/health

Tasks API: http://localhost:4000/api/tasks
-------------------
Stop
docker compose down


Nếu muốn xoá dữ liệu DB local:

docker compose down -v
--------------------
