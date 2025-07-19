import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import CommonLayout from "@/components/common-layout";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "JOBSCO | Smart Job Portal for Candidates & Recruiters",
  description:
    "JOBSCO is a modern job portal where candidates apply and track jobs, and recruiters post jobs and manage applicants. Built with Next.js, Clerk, Supabase, and Stripe.",
  keywords: [
    "Job Portal",
    "JOBSCO",
    "Next.js Job Site",
    "Job Application",
    "Job Board",
    "Recruiter Platform",
    "Supabase Resume Upload",
    "Stripe Membership",
    "Clerk Authentication",
    "Job Tracking",
    "Career Platform",
    "Next.js App",
  ],
  authors: [
    { name: "Ayush Rajput", url: "https://github.com/ayushrajput-dev" }
  ],
  creator: "Ayush Rajput",
  generator: "Next.js 14",
  applicationName: "JOBSCO",
  metadataBase: new URL("https://jobsco-job-portal-app.vercel.app"),
  openGraph: {
    title: "JOBSCO | Modern Job Portal for Everyone",
    description:
      "A role-based job platform for applying and posting jobs. Explore jobs, apply with resume, track status, and more.",
    url: "https://jobsco-job-portal-app.vercel.app",
    siteName: "JOBSCO",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://daipgxuvatvcobzbxpjn.supabase.co/storage/v1/object/public/job-portal-public//Screenshot%202025-07-19%20141329.png", 
        width: 1200,
        height: 630,
        alt: "JOBSCO - Smart Job Portal",
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "JOBSCO | Smart Job Portal for Candidates & Recruiters",
  //   description:
  //     "A modern job portal with Clerk authentication, Supabase resume storage, and Stripe membership.",
  //   creator: "@yourtwitter", // Replace with your Twitter handle
  //   images: ["/og-image.png"], // replace with actual path
  // },
  themeColor: "#ffffff",
  colorScheme: "light",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Suspense fallback={<Loading/>}>
            <CommonLayout>
              {children}  {/*This is will destructure as a prop in my CommonLAyout component */}
              <SpeedInsights />
              <Analytics />
            </CommonLayout>
            <Toaster/>
          </Suspense>
        </body>
    </html>
    </ClerkProvider>
  );
}
