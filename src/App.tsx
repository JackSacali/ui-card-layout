import React, { useState, useRef, useEffect } from "react";

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  initials: string;
}

const MEMBERS: Member[] = [
  {
    id: "1",
    name: "Sarah Connor",
    email: "s.connor@cyberdyne.corp",
    role: "Admin",
    initials: "SC",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john.doe.enterprise.platform.service@organization.internal",
    role: "Member",
    initials: "JD",
  },
];

export default function App() {
  const [openMenuId, setOpenMenuId] = useState<string | null>("2");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 p-6">
      <div className="w-96 rounded-2xl bg-white shadow-xl border border-slate-200/80 overflow-hidden relative">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-4 text-white">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-indigo-100">
            Workspace Members
          </h2>
          <p className="text-xs text-indigo-200 mt-0.5">
            Manage access and permissions
          </p>
        </div>

        <div className="p-3 divide-y divide-slate-100">
          {MEMBERS.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50/80 transition-colors relative"
            >
              <div className="h-9 w-9 shrink-0 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center text-xs font-bold">
                {member.initials}
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-800">
                    {member.name}
                  </span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    {member.role}
                  </span>
                </div>
                <span className="text-xs text-slate-400 truncate">
                  {member.email}
                </span>
              </div>

              <div className="relative shrink-0" ref={member.id === openMenuId ? menuRef : null}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={openMenuId === member.id}
                  aria-label={`Options for ${member.name}`}
                  onClick={() =>
                    setOpenMenuId(openMenuId === member.id ? null : member.id)
                  }
                  className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                  Options
                </button>

                {openMenuId === member.id && (
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-xl shadow-2xl border border-slate-200 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                  >
                    <button
                      role="menuitem"
                      type="button"
                      className="w-full text-left px-2.5 py-1.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition-colors"
                    >
                      Change Role
                    </button>
                    <button
                      role="menuitem"
                      type="button"
                      className="w-full text-left px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      Remove Member
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}