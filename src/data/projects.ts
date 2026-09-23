import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "peopleflow-hrms",
    title: "PeopleFlow — Enterprise HRMS",
    discipline: "engineering",
    category: "Full stack · HR tech",
    status: "Live",
    period: "2026",
    accent: "mint",
    summary:
      "A production-ready HR management system covering the full HR lifecycle: role-based access, employee records, verified attendance, leave, tasks, payslips and real-time notifications.",
    detail:
      "Built on the MERN stack with the backend patterns used in modern product companies: refresh-token rotation, Redis caching, BullMQ job queues, Socket.io and OpenAPI documentation. Fully responsive, with light and dark themes.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Redis", "Socket.io", "JWT"],
    highlights: [
      "GPS-geofenced, QR-verified attendance",
      "Role-based access for Admin, HR, Manager & Employee",
      "Leave, tasks & live Socket.io notifications",
      "Payslip PDFs & weekly reports via BullMQ jobs",
    ],
    repoUrl: "https://github.com/code-by-nidhi/PeopleFlow-Enterprise-HRMS",
    liveUrl: "https://peopleflow-enterprise-hrms-frontend.onrender.com",
    extraLinks: [
      {
        label: "API docs",
        href: "https://peopleflow-enterprise-hrms-backend.onrender.com/api/docs",
      },
    ],
  },
  {
    id: "bazaro-ecommerce",
    title: "Bazaro — Clothing E-Commerce",
    discipline: "engineering",
    category: "Full stack · Commerce",
    status: "Live",
    period: "2026",
    accent: "sand",
    summary:
      "A complete clothing storefront with a separate admin portal: admin-driven categories, advanced filtering, a server-validated checkout with Razorpay payments, and analytics for the store team.",
    detail:
      "Three deployments on the MERN stack: a customer storefront, an admin portal with its own login, and a shared REST API. Prices are validated on the server and Razorpay payments are verified with HMAC-SHA256 signatures.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind", "Razorpay"],
    highlights: [
      "Catalogue with search, price, rating & brand filters",
      "Cart, coupons and a 4-step server-validated checkout",
      "Razorpay payments with signature verification + COD",
      "Admin portal for products, orders, coupons & analytics",
    ],
    repoUrl: "https://github.com/code-by-nidhi/Bazaro",
    liveUrl: "https://bazaro-website-ecom-2026.onrender.com",
    extraLinks: [
      { label: "Admin portal", href: "https://bazaro-admin-ecom-2026.onrender.com" },
    ],
  },
];
