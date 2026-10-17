# Student Task Manager — Project Architecture

## 1. Product idea
Student Task Manager is a small web application that helps students keep track of assignments, coursework, exams, and personal study tasks. Students can create tasks, set due dates and priorities, mark work as completed, and filter their task list.

## 2. Target users
- University and school students who need a simple study planner.

## 3. Core requirements
- List all tasks.
- Add a task with title, description, due date, and priority.
- Edit task details.
- Mark a task as pending or completed.
- Delete a task.
- Filter tasks by status and priority.

## 4. Technology stack
- Frontend: React with Vite
- Backend: Node.js and Express
- Database: SQLite for a simple local setup
- API: REST endpoints returning JSON
- Validation: server-side validation for required fields and valid status/priority values

## 5. High-level architecture
Browser (React UI) → HTTP/JSON REST API (Express) → data access layer → SQLite database.

The frontend is responsible for displaying screens, collecting input, and calling the API. The backend validates requests and applies business rules. The database stores task records persistently.

## 6. Data models

### Task
| Field | Type | Rules |
|---|---|---|
| id | Integer | Primary key, auto-generated |
| title | String | Required, 1–120 characters |
| description | String | Optional |
| dueDate | Date / nullable | Optional |
| priority | String | `low`, `medium`, or `high`; default `medium` |
| status | String | `pending` or `completed`; default `pending` |
| createdAt | DateTime | Set when created |
| updatedAt | DateTime | Updated whenever task changes |

### Example JSON
```json
{
  "id": 1,
  "title": "Complete database assignment",
  "description": "Finish ER diagram and report",
  "dueDate": "2026-10-25",
  "priority": "high",
  "status": "pending",
  "createdAt": "2026-10-17T10:00:00.000Z",
  "updatedAt": "2026-10-17T10:00:00.000Z"
}
```

## 7. API routes

Base path: `/api`

| Method | Route | Purpose | Expected response |
|---|---|---|---|
| GET | `/health` | Check that API is running | `{ "status": "ok" }` |
| GET | `/tasks` | Return all tasks; optionally filter with `?status=pending` | Array of tasks |
| GET | `/tasks/:id` | Return one task | Task object or 404 |
| POST | `/tasks` | Create a task | Created task, status 201 |
| PUT | `/tasks/:id` | Update task fields | Updated task or 404 |
| PATCH | `/tasks/:id/status` | Change task status | Updated task or 404 |
| DELETE | `/tasks/:id` | Delete a task | Success message or 404 |

### POST `/api/tasks` request example
```json
{
  "title": "Prepare for networking quiz",
  "description": "Review lecture notes",
  "dueDate": "2026-10-22",
  "priority": "medium"
}
```

### Error handling
- `400 Bad Request`: invalid or missing input
- `404 Not Found`: task does not exist
- `500 Internal Server Error`: unexpected server failure

## 8. Frontend screens

1. **Dashboard / Task List**
   - Shows task count and task cards or rows.
   - Provides status and priority filters.
   - Offers Edit, Complete, and Delete actions.

2. **Add Task**
   - Form fields: title, description, due date, priority.
   - Validates the required title before submission.

3. **Edit Task**
   - Loads the selected task and allows its fields to be changed.

4. **Task Details (optional)**
   - Shows full description, due date, priority, and status.

5. **Empty / Error States**
   - Explains when no tasks exist or the API cannot be reached.

## 9. Suggested folder structure
```text
student-task-manager/
├── ARCHITECTURE.md
├── README.md
├── backend/
│   ├── package.json
│   └── src/
│       └── server.js
└── frontend/
    ├── package.json
    ├── index.html
    └── src/
        ├── main.jsx
        └── App.jsx
```

## 10. Security and quality
- Validate all user input on the server.
- Use parameterized SQL queries when database integration is added.
- Keep secrets in environment variables; do not commit `.env` files.
- Return consistent JSON errors.
- Add tests for task creation, updating, and deletion before production use.

## 11. Development plan
1. Set up the React and Express starter.
2. Implement task CRUD endpoints.
3. Connect SQLite and create the `tasks` table.
4. Connect frontend forms and list to the API.
5. Add filtering, validation, and error states.
6. Test the main user flows and document screenshots.

## 12. Scope note
This is a starter architecture and scaffold. The health endpoint and basic frontend shell are included; persistent storage and task CRUD are planned follow-up work.
