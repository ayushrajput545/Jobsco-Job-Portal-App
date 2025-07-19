
"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
 

const Views = ({ id ,viewCount }) => {
  const pathname = usePathname()
 
  useEffect(() => {
    if (pathname !== "/") return;
    const updateViews = async () => {
      const res = await fetch("/api/view-count", { // view count only increase when user visit home page and refresh home page
        method: "PUT",
        body: JSON.stringify({ id }),
      });

      const data =  await res.json();
    };

    updateViews();
    
  }, [id ,pathname]);

  return (
    <div className="fixed right-5 bottom-9 mt-6 flex justify-center">
      <Button className="gap-2 bg-slate-900 text-white hover:bg-slate-800">
        <Eye className="size-5" />
         {viewCount ?? 0} Views
      </Button>
    </div>
  );
};

export default Views;
