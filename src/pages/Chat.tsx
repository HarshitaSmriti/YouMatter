import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import {
  Sparkles,
  Send,
  ArrowLeft,
  History,
  Plus,
  ChevronRight,
  X,
  MessageCircle,
  Clock,
} from "lucide-react";
 
interface Message {
  sender: string;
  message?: string;
  text?: string;
  timestamp?: number;
}
 
interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
}
 
const SESSION_KEY = "youmatter_chat_sessions";
const CURRENT_KEY = "youmatter_current_session";
 
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
 
function getSessionTitle(messages: Message[]): string {
  const first = messages.find(
    (m) => (m.sender || "").toLowerCase() === "user"
  );
  const text = first?.message || first?.text || "";
  return text.length > 40 ? text.slice(0, 40) + "…" : text || "New conversation";
}
 
function formatTime(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
 
function Chat() {
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);
 
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    return localStorage.getItem(CURRENT_KEY) || generateSessionId();
  });
  const [viewingSession, setViewingSession] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
 
  const prompts = [
    "I'm feeling overwhelmed today",
    "Help me process anxiety",
    "I need someone to talk to",
    "Guide me through a tough day",
  ];
 
  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        setSessions(JSON.parse(stored));
      } catch {}
    }
    localStorage.setItem(CURRENT_KEY, currentSessionId);
    fetchConversation();
  }, []);
 
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);
 
  const fetchConversation = async () => {
    try {
      const res = await api.get("/conversation");
      const fetched: Message[] = res.data.data || [];
      setMessages(fetched);
      if (fetched.length > 0) setHasInteracted(true);
    } catch (err) {
      console.log(err);
    }
  };
 
  const persistSession = (msgs: Message[]) => {
    if (msgs.length === 0) return;
    const updated: ChatSession = {
      id: currentSessionId,
      title: getSessionTitle(msgs),
      messages: msgs,
      timestamp: Date.now(),
    };
    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== currentSessionId);
      const next = [updated, ...filtered].slice(0, 50);
      localStorage.setItem(SESSION_KEY, JSON.stringify(next));
      return next;
    });
  };
 
  const sendMessage = async (text?: string) => {
    const finalMessage = text || message;
    if (!finalMessage.trim()) return;
 
    const optimisticMsg: Message = {
      sender: "user",
      message: finalMessage,
      timestamp: Date.now(),
    };
 
    const nextMessages = [...messages, optimisticMsg];
    setMessages(nextMessages);
    setMessage("");
    setHasInteracted(true);
    setIsLoading(true);
 
    try {
      await api.post("/message", {
        message: finalMessage,
        sender: "user",
      });
      await fetchConversation();
      persistSession(nextMessages);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
 
  const startNewChat = async () => {
    persistSession(messages);
    const newId = generateSessionId();
    setCurrentSessionId(newId);
    localStorage.setItem(CURRENT_KEY, newId);
    setMessages([]);
    setHasInteracted(false);
    setViewingSession(null);
    setHistoryOpen(false);
    try {
      await api.post("/conversation/new", {});
    } catch {}
  };
 
  const loadSession = (session: ChatSession) => {
    setViewingSession(session);
    setHistoryOpen(false);
  };
 
  const exitSessionView = () => setViewingSession(null);
 
  const displayMessages = viewingSession ? viewingSession.messages : messages;
 
  return (
    <div className="flex h-screen overflow-hidden bg-[#fcfbff]">
      {/* SIDEBAR */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
 
      {/* HISTORY DRAWER */}
      <div
        className={`fixed inset-y-0 right-0 z-30 flex flex-col border-l border-[#efe8ff] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          historyOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "min(320px, 90vw)" }}
      >
        <div className="flex items-center justify-between border-b border-[#efe8ff] px-5 py-4">
          <div className="flex items-center gap-2">
            <History size={18} className="text-[#8a6dff]" />
            <span className="font-bold text-[#241b43]">Chat History</span>
          </div>
          <button
            onClick={() => setHistoryOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-[#8d84ad] hover:bg-[#f4efff] transition"
          >
            <X size={16} />
          </button>
        </div>
 
        <div className="px-4 py-3">
          <button
            onClick={startNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8a6dff] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#7857ff] active:scale-[0.98]"
          >
            <Plus size={16} />
            New Conversation
          </button>
        </div>
 
        <div className="flex-1 overflow-y-auto px-3 pb-4">
          {sessions.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <MessageCircle size={32} className="text-[#c5bbf0] mb-3" />
              <p className="text-sm text-[#8d84ad]">No past conversations yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => loadSession(session)}
                  className={`group flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-[#f4efff] ${
                    viewingSession?.id === session.id ? "bg-[#f4efff]" : ""
                  }`}
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#f2ebff]">
                    <Sparkles size={14} className="text-[#8a6dff]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#241b43]">
                      {session.title}
                    </p>
                    <div className="mt-0.5 flex items-center gap-1">
                      <Clock size={11} className="text-[#b0a8cc]" />
                      <span className="text-xs text-[#b0a8cc]">
                        {formatTime(session.timestamp)}
                      </span>
                      <span className="text-xs text-[#b0a8cc]">·</span>
                      <span className="text-xs text-[#b0a8cc]">
                        {session.messages.length} msgs
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    size={14}
                    className="mt-1.5 shrink-0 text-[#c5bbf0] transition group-hover:text-[#8a6dff]"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
 
      {/* Backdrop */}
      {historyOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm"
          onClick={() => setHistoryOpen(false)}
        />
      )}
 
      {/* MAIN */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* TOPBAR */}
        <div className="border-b border-[#efe8ff] bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="flex items-center justify-between gap-3">
            {/* LEFT */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                onClick={() => navigate("/home")}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f4efff] transition hover:bg-[#ece3ff]"
              >
                <ArrowLeft size={18} className="text-[#8a6dff]" />
              </button>
 
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f2ebff]">
                <Sparkles size={20} className="text-[#8a6dff]" />
              </div>
 
              <div className="min-w-0">
                <h1 className="truncate text-base font-black text-[#241b43] sm:text-xl leading-tight">
                  YouMatter AI
                </h1>
                <p className="text-[11px] text-[#8d84ad]">Calm · Supportive · Safe</p>
              </div>
            </div>
 
            {/* RIGHT */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={startNewChat}
                className="flex items-center gap-1.5 rounded-2xl border border-[#e0d8ff] bg-white px-3 py-2 text-xs font-semibold text-[#8a6dff] transition hover:bg-[#f4efff]"
              >
                <Plus size={14} />
                <span className="hidden sm:inline">New Chat</span>
              </button>
 
              <button
                onClick={() => setHistoryOpen(true)}
                className="relative flex items-center gap-1.5 rounded-2xl border border-[#e0d8ff] bg-white px-3 py-2 text-xs font-semibold text-[#8a6dff] transition hover:bg-[#f4efff]"
              >
                <History size={14} />
                <span className="hidden sm:inline">History</span>
                {sessions.length > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#8a6dff] text-[9px] font-bold text-white">
                    {sessions.length > 9 ? "9+" : sessions.length}
                  </span>
                )}
              </button>
            </div>
          </div>
 
          {/* Viewing old session banner */}
          {viewingSession && (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#f4efff] px-4 py-2">
              <div className="flex items-center gap-2">
                <History size={13} className="text-[#8a6dff] shrink-0" />
                <span className="text-xs font-medium text-[#6d52d4] truncate max-w-[180px] sm:max-w-none">
                  Viewing: "{viewingSession.title}"
                </span>
              </div>
              <button
                onClick={exitSessionView}
                className="flex items-center gap-1 rounded-xl px-2 py-1 text-xs font-semibold text-[#8a6dff] hover:bg-[#ece3ff] whitespace-nowrap"
              >
                Back to current <ChevronRight size={12} />
              </button>
            </div>
          )}
        </div>
 
        {/* CHAT AREA */}
        <div className="relative flex flex-1 flex-col overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#efe7ff] opacity-25 blur-3xl" />
 
          {/* MESSAGES */}
          <div className="relative flex-1 overflow-y-auto px-4 py-5 sm:px-6">
            <div className="mx-auto flex max-w-2xl flex-col gap-4">
              {/* EMPTY STATE */}
              {displayMessages.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-18 w-18 items-center justify-center rounded-[20px] bg-[#f2ebff] p-5 shadow-[0_8px_32px_rgba(138,109,255,0.12)]">
                    <Sparkles size={32} className="text-[#8a6dff]" />
                  </div>
                  <h2 className="mt-5 text-xl font-black text-[#241b43] sm:text-3xl leading-tight">
                    Start a Safe Conversation
                  </h2>
                  <p className="mt-2 max-w-sm text-sm leading-7 text-[#6d6787]">
                    Share your thoughts freely in a calm, supportive and judgment-free space.
                  </p>
                </div>
              )}
 
              {/* MESSAGES */}
              {displayMessages.map((msg, index) => {
                const isUser = (msg.sender || "").toLowerCase() === "user";
                const content = msg.message || msg.text || "";
                return (
                  <div
                    key={index}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    style={{ animation: "fadeUp 0.2s ease-out" }}
                  >
                    {!isUser ? (
                      <div className="flex max-w-[90%] items-start gap-2 sm:max-w-[75%]">
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#f2ebff]">
                          <Sparkles size={13} className="text-[#8a6dff]" />
                        </div>
                        <div className="rounded-[20px] rounded-tl-sm bg-white px-4 py-3 shadow-[0_4px_16px_rgba(36,22,61,0.06)]">
                          <p className="text-sm leading-7 text-[#241b43] sm:text-[15px] whitespace-pre-wrap">
                            {content}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="max-w-[90%] rounded-[20px] rounded-tr-sm bg-[#8a6dff] px-4 py-3 shadow-[0_6px_20px_rgba(138,109,255,0.22)] sm:max-w-[75%]">
                        <p className="text-sm leading-7 text-white sm:text-[15px] whitespace-pre-wrap">
                          {content}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
 
              {/* TYPING INDICATOR */}
              {isLoading && (
                <div className="flex justify-start" style={{ animation: "fadeUp 0.2s ease-out" }}>
                  <div className="flex items-start gap-2">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#f2ebff]">
                      <Sparkles size={13} className="text-[#8a6dff]" />
                    </div>
                    <div className="rounded-[20px] rounded-tl-sm bg-white px-4 py-4 shadow-[0_4px_16px_rgba(36,22,61,0.06)]">
                      <div className="flex items-center gap-1.5">
                        {[0, 150, 300].map((delay) => (
                          <span
                            key={delay}
                            className="h-2 w-2 rounded-full bg-[#c5bbf0]"
                            style={{
                              animation: `typingBounce 1.2s ${delay}ms infinite`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
 
              <div ref={bottomRef} />
            </div>
          </div>
 
          {/* INPUT SECTION */}
          {!viewingSession && (
            <div className="border-t border-[#efe8ff] bg-white/90 px-4 py-4 backdrop-blur-md sm:px-6">
              <div className="mx-auto max-w-2xl">
                {/* PROMPTS — shown only before first message */}
                {!hasInteracted && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {prompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => sendMessage(prompt)}
                        className="rounded-full border border-[#e0d8ff] bg-[#f4efff] px-3 py-1.5 text-xs font-medium text-[#8a6dff] transition hover:bg-[#ece3ff] active:scale-[0.97]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
 
                {/* INPUT BAR */}
                <div className="flex items-end gap-2 rounded-[22px] border border-[#efe8ff] bg-white px-4 py-3 shadow-[0_4px_16px_rgba(138,109,255,0.07)] focus-within:border-[#c5bbf0] transition-all">
                  <textarea
                    rows={1}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      e.target.style.height = "auto";
                      e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Type your message… (Enter to send)"
                    className="flex-1 resize-none bg-transparent text-sm text-[#241b43] outline-none placeholder:text-[#9a92b5] leading-6"
                    style={{ maxHeight: "120px" }}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!message.trim() || isLoading}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#8a6dff] transition hover:bg-[#7857ff] active:scale-[0.95] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send size={15} className="text-white" />
                  </button>
                </div>
 
                <p className="mt-2 text-center text-[10px] text-[#b0a8cc]">
                  YouMatter AI listens — not a replacement for professional help.
                </p>
              </div>
            </div>
          )}
 
          {/* READ-ONLY BANNER */}
          {viewingSession && (
            <div className="border-t border-[#efe8ff] bg-[#faf8ff] px-4 py-3 sm:px-6">
              <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-3">
                <p className="text-sm text-[#8d84ad]">
                  This is a past conversation — read only.
                </p>
                <button
                  onClick={exitSessionView}
                  className="rounded-2xl bg-[#8a6dff] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7857ff]"
                >
                  Return to current chat
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
 
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
 
export default Chat;
 