"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import GlassCard from "./GlassCard";

export default function GuestbookList() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [pageSize, setPageSize] = useState(5);

  const PAGE_WINDOW = 1;

  // ---------- Responsive Page Size ----------
  useEffect(() => {
    const handleResize = () => {
      setPageSize(window.innerWidth >= 768 ? 10 : 5);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPage = Math.ceil(total / pageSize);

  // ---------- Fetch ----------
  useEffect(() => {
    fetchPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, pageSize]);

  const fetchPage = async (pageNumber: number) => {
    setLoading(true);

    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count } = await supabase
      .from("guestbook")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    setList(data || []);
    setTotal(count || 0);
    setLoading(false);
  };

  // ---------- Pagination Logic ----------
  const getPages = () => {
    const pages: (number | "...")[] = [];

    const start = Math.max(1, page - PAGE_WINDOW);
    const end = Math.min(totalPage, page + PAGE_WINDOW);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPage) {
      if (end < totalPage - 1) pages.push("...");
      pages.push(totalPage);
    }

    return pages;
  };

  const pages = getPages();

  // ---------- Skeleton ----------
  if (loading) {
    return (
      <div className="space-y-4 mt-6">
        {Array.from({ length: pageSize }).map((_, i) => (
          <GlassCard key={i} className="p-6 animate-pulse">
            <div className="h-4 w-24 bg-white/30 rounded mb-3" />
            <div className="h-3 w-full bg-white/20 rounded mb-2" />
            <div className="h-3 w-3/4 bg-white/20 rounded" />
          </GlassCard>
        ))}
      </div>
    );
  }

  // ---------- Empty ----------
  if (!list.length) {
    return (
      <GlassCard className="p-10 text-center text-[#6E5A8A]">
        아직 방명록이 없어요
      </GlassCard>
    );
  }

  return (
    <>
      {/* LIST */}
      <div className="space-y-4 mt-6">
        {list.map((item) => (
          <GlassCard
            key={item.id}
            className="
              p-5 md:p-6
              backdrop-blur-xl
              border border-white/40
              transition
              hover:scale-[1.01]
              active:scale-[0.99]
            "
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-[#4F3F6B]">{item.name}</p>

              <span className="text-xs text-[#8B6FE8]">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </div>

            <p className="mt-3 text-[#6E5A8A] whitespace-pre-wrap">
              {item.message}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="
        sticky bottom-0
        backdrop-blur-md
        pt-6 pb-4
        mt-12
      ">
        <div className="flex justify-center gap-2 flex-wrap">

          <PageBtn disabled={page === 1} onClick={() => setPage(1)}>
            First
          </PageBtn>

          <PageBtn disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </PageBtn>

          {pages.map((p, i) =>
            p === "..." ? (
              <span key={i} className="px-2 text-[#6E5A8A]">...</span>
            ) : (
              <button
                key={p}
                aria-label={`페이지 ${p}`}
                onClick={() => setPage(p)}
                className={`
                  cursor-pointer
                  w-11 h-11 md:w-10 md:h-10
                  rounded-xl transition font-medium
                  ${p === page
                    ? "bg-[#A78BFA] text-white shadow-lg"
                    : "bg-white/40 hover:bg-white/60 text-[#6E5A8A]"
                  }
                `}
              >
                {p}
              </button>
            )
          )}

          <PageBtn disabled={page === totalPage} onClick={() => setPage(page + 1)}>
            Next
          </PageBtn>

          <PageBtn disabled={page === totalPage} onClick={() => setPage(totalPage)}>
            Last
          </PageBtn>

        </div>
      </div>
    </>
  );
}

function PageBtn({ children, ...props }: any) {
  return (
    <button
      {...props}
      className="
        px-3 md:px-4
        h-11 md:h-10
        rounded-xl
        bg-white/40
        hover:bg-white/60
        text-[#6E5A8A]
        disabled:opacity-40
        transition
        font-medium
        cursor-pointer
      "
    >
      {children}
    </button>
  );
}
