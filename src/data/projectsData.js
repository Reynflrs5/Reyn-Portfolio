import gwa1 from "../assets/gwa1.png";
import rentgo1 from "../assets/rentgo1.jpg";
import rentgo2 from "../assets/rentgo2.jpg";
import rentgo3 from "../assets/rentgo3.jpg";
import cssLab1 from "../assets/cssnet.png";

export const projectsData = [
  {
    name: "GWA Calculator",
    desc: "A clean, fast tool for students to compute their General Weighted Average in seconds — no spreadsheets, no manual math.",
    features: [
      "Instant GWA computation with unit-weighted grades",
      "Save and revisit past semester records",
      "Mobile-friendly, works on any device",
    ],
    tags: ["#1 STUDENT TOOL", "WEB APP"],
    tech: "React, Vite",
    status: "live",
    link: "https://gwa-calculator-reyn.vercel.app/",
    github: "https://github.com/Reynflrs5",
    image: gwa1,
    images: [gwa1],
  },
  {
    name: "RentGo",
    desc: "A full-stack car rental booking system for mobile and web.",
    longDesc: "Car Rental Management System is a digital platform designed to make vehicle renting faster, easier, and more organized. Instead of relying on manual reservations, phone calls, or messaging, users can register, browse available cars, select their preferred vehicle, make a reservation, choose a payment method, and receive booking confirmation online. For administrators or car owners, the system provides centralized management of vehicles, users, bookings, payments, and reports.",
    features: [
      "User Registration & Login – Secure account access for renters",
      "Car Browsing – View available vehicles and their details",
      "Online Booking – Reserve a car through the system",
      "Payment Management – Process and track rental payments",
      "Booking Confirmation – Receive confirmation after a successful reservation",
      "Cancel/Reschedule – Manage and modify existing bookings",
      "Car Management – Admin can add, edit, and manage rental vehicles",
      "Booking Management – Admin can monitor and manage reservations",
      "User Management – Admin can manage registered users",
      "Reports & Analytics – View bookings, revenue, and rental statistics"
    ],
    tags: ["FULL STACK", "MANAGEMENT"],
    tech: "React Native, Node.js, MySQL",
    status: "live",
    link: "#",
    github: "https://github.com/Reynflrs5",
    image: rentgo1,
    images: [rentgo1, rentgo2, rentgo3],
  },
  {
    name: "CSS_LAB Reference",
    desc: "Technical study reference for Computer Systems Servicing (CSS) NC II covering hardware assembly, PC parts schematic, networking, and troubleshooting.",
    features: [
      "Hardware assembly guide",
      "Interactive PC parts schematic",
      "Networking configuration reference",
      "System diagnostics & troubleshooting steps"
    ],
    tags: ["STUDY REFERENCE", "WEB APP"],
    tech: "React, Vite",
    status: "live",
    link: "https://learnnetserv.vercel.app/",
    github: "https://github.com/Reynflrs5",
    image: cssLab1,
    images: [cssLab1],
  },
];
