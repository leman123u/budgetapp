import { useState, useRef, useEffect } from "react";
import axios from "../config/axios";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";
import ReactMarkdown from "react-markdown";

export default function AIChat() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const suggestions = [
    "Analyze my expenses",
    "How can I save money?",
    "Create monthly budget",
    "Financial tips"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async (text) => {
    const msg = text || message;
    if (!msg.trim()) return;

    setChat(prev => [...prev, { role: "user", text: msg }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("/ai/ask", { prompt: msg });

      setChat(prev => [...prev,
        { role: "assistant", text: res.data }
      ]);

    } catch {
      setChat(prev => [...prev,
        { role: "assistant", text: "AI unavailable (check API quota)." }
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      background: "#EEF2F7"
    }}>

      {/* SIDEBAR */}
      <div style={{
        width: 260,
        background: "white",
        borderRight: "1px solid #E5E7EB",
        padding: 20,
        display: "flex",
        flexDirection: "column"
      }}>

        <div style={{
          fontWeight: 700,
          fontSize: 18,
          marginBottom: 30,
          display: "flex",
          alignItems: "center",
          gap: 10
        }}>
          <SmartToyIcon style={{ color: "#2563EB" }}/>
          Budget AI
        </div>

        <button style={sideBtn}>
          <AddIcon fontSize="small"/> New Chat
        </button>

        <div style={{ marginTop: 20 }}>
          <MenuItem label="Spending Analysis"/>
          <MenuItem label="Savings Plan"/>
          <MenuItem label="Budget Tips"/>
          <MenuItem label="Reports"/>
        </div>

        <div style={{ marginTop: 30, fontSize: 13, color:"#6B7280"}}>
          Today
        </div>

        <button style={historyBtn}>
          <ChatIcon fontSize="small"/> Budget advice chat
        </button>

      </div>

      {/* MAIN CHAT AREA */}
      <div style={{
        flex:1,
        display:"flex",
        flexDirection:"column"
      }}>

        <div style={{
          padding:"18px 30px",
          background:"white",
          borderBottom:"1px solid #E5E7EB",
          fontWeight:600,
          fontSize:18
        }}>
          Smart Finance Assistant
        </div>

        <div style={{
          flex:1,
          overflowY:"auto",
          padding:40
        }}>

          {chat.length === 0 && (
            <div style={{ textAlign:"center", marginTop:100 }}>
              <h2>How can I help with your finances?</h2>

              <div style={{
                marginTop:20,
                display:"flex",
                gap:10,
                justifyContent:"center",
                flexWrap:"wrap"
              }}>
                {suggestions.map((s,i)=>(
                  <button
                    key={i}
                    onClick={()=>sendMessage(s)}
                    style={suggestBtn}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {chat.map((msg,i)=>(
            <div key={i} style={{
              display:"flex",
              justifyContent: msg.role==="user" ? "flex-end":"flex-start",
              marginBottom:15
            }}>
              <div style={{
                background: msg.role==="user" ? "#2563EB" : "#F3F4F6",
                color: msg.role==="user" ? "white" : "#111827",
                padding:"12px 18px",
                borderRadius:16,
                maxWidth:"70%"
              }}>
                {msg.role === "assistant" ? (
                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}

          {loading && <p>AI thinking...</p>}
          <div ref={chatEndRef}/>
        </div>

        {/* INPUT */}
        <div style={{
          padding:20,
          background:"white",
          borderTop:"1px solid #E5E7EB"
        }}>

          <div style={{
            display:"flex",
            alignItems:"center",
            border:"1px solid #D1D5DB",
            borderRadius:30,
            padding:"10px 15px"
          }}>

            <input
              value={message}
              onChange={e=>setMessage(e.target.value)}
              onKeyDown={e=>e.key==="Enter" && sendMessage()}
              placeholder="Ask anything about your finances..."
              style={{
                flex:1,
                border:"none",
                outline:"none",
                fontSize:15
              }}
            />

            <button
              onClick={()=>sendMessage()}
              style={{
                border:"none",
                background:"#2563EB",
                color:"white",
                borderRadius:"50%",
                width:42,
                height:42,
                cursor:"pointer"
              }}
            >
              <SendIcon fontSize="small"/>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

/* ---------- styles ---------- */

const sideBtn = {
  display:"flex",
  alignItems:"center",
  gap:8,
  border:"1px solid #E5E7EB",
  padding:"10px 12px",
  borderRadius:10,
  background:"#F9FAFB",
  cursor:"pointer"
};

const historyBtn = {
  marginTop:10,
  padding:"10px 12px",
  borderRadius:10,
  border:"none",
  background:"#EEF2FF",
  cursor:"pointer",
  display:"flex",
  gap:8,
  alignItems:"center"
};

const suggestBtn = {
  padding:"10px 16px",
  borderRadius:20,
  border:"1px solid #E5E7EB",
  background:"white",
  cursor:"pointer"
};

function MenuItem({label}){
  return(
    <div style={{
      padding:"10px 12px",
      borderRadius:10,
      cursor:"pointer",
      marginBottom:6
    }}>
      {label}
    </div>
  );
}