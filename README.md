# 💼 JOBSCO - Modern Job Portal Platform

**JOBSCO** is a full-featured job portal platform that streamlines the job application and recruitment process for both candidates and recruiters. Built with modern web technologies like **Next.js**, **Shadcn UI**, **Tailwind CSS**, and integrated with **Stripe**, **Clerk**, and **Supabase**, this platform provides seamless role-based access, authentication, resume management, email notifications, and real-time features.

---

## 🚀 Live Demo

🔗 [https://jobsco-job-portal-app.vercel.app](https://jobsco-job-portal-app.vercel.app)

---

## ✨ Features

### 👥 Role-Based Access System
- On signup, users must choose to onboard either as a **Candidate** or **Recruiter**.
- Each role has access to features specific to their responsibilities.

### 🔐 Secure Authentication
- Authentication via **Clerk.dev** with **Google** and **GitHub** login options.
- Session management and protected routes using Clerk middleware.

### 📁 Supabase Resume Storage
- Candidates can upload their resumes securely to **Supabase Storage**.
- Recruiters can download and review submitted resumes.

### 💳 Stripe Payment Integration
- Free tier limits:
  - Candidates: Can apply to **maximum 3 jobs**.
  - Recruiters: Can post a **limited number of jobs**.
- For extended access, users can **buy a membership** through **Stripe Checkout**.

### 📌 Candidate Dashboard
- Fill in profile details (skills, experience, resume, etc.).
- Track job applications in the **Activity** section:
  - View **applied jobs**, and their **status**: _Applied_, _Selected_, or _Rejected_.
- **Edit personal profile** information.

### 🧑‍💼 Recruiter Dashboard
- Post new jobs (limit applied without membership).
- View applicants for each job posting.
- Access candidate profile and resume.
- Mark applications as _Selected_ or _Rejected_.
- **Edit account details** at any time.

### 🐞 Bug Reporting with Email Notifications
- Users can submit a bug report form with issue details.
- Sends **email notification** to admin/developer when a new bug is submitted.

### 👁️ Live View Count
- Integrated **live view count** feature to show page impressions in real-time.

### 🔧 Server Features
- **Server Actions (Next.js App Router)**
  - Handle form submissions securely.
  - Apply for jobs, post jobs, update profiles.
- **Email Notifications**
  - Sends email to admin on bug report submission.
    
## 🛠️ Tech Stack

| Tech       | Purpose                                      |
|------------|----------------------------------------------|
| **Next.js**| Fullstack React framework with App Router    |
| **Shadcn UI**| Modern, accessible UI components           |
| **Tailwind CSS**| Utility-first styling                   |
| **Clerk**  | Authentication via Google, GitHub (OAuth)    |
| **Supabase**| Cloud storage for resumes                   |
| **Stripe** | Secure payment & membership subscription     |
| **Vercel** | Hosting and deployment                       |

---

## 📌 How to Use

### 🧑 Candidate Flow
1. Sign up using **Google** or **GitHub**.
2. Choose role: `Candidate`.
3. Fill profile details & **upload resume**.
4. Apply to up to **3 jobs**.
5. To apply for more jobs, **purchase membership** via Stripe.
6. Track applications in **Activity tab**.
7. Update profile anytime.

### 🧑‍💼 Recruiter Flow
1. Sign up using **Google** or **GitHub**.
2. Choose role: `Recruiter`.
3. Fill in profile & company details.
4. Post a limited number of jobs for free.
5. To post unlimited jobs, **purchase membership** via Stripe.
6. View applicants for each job, download resumes.
7. Mark them as **selected** or **rejected**.
8. Update company or personal info anytime.

---

## 📫 Bug Reporting

- Navigate to the **Bug Report** page.
- Describe the issue and submit.
- Admin receives email with bug details instantly.

---

## 📊 Real-time View Counter

- View count is shown on homepage using a real-time update mechanism to count visitor traffic.

---

## 🧪 Coming Soon

- Resume parsing and auto-suggestion
- AI-based job match
- Admin dashboard

---

## 🌐 Deployment

> The project is fully deployed on **Vercel**.

---

## 🤝 Contributing

If you'd like to improve the platform or report bugs:

```bash
git clone https://github.com/ayushrajput545/Jobsco-Job-Portal-App.git
cd jobsco
npm install
npm run dev
