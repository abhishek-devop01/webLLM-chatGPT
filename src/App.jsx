import { useEffect, useState } from "react";
import * as webllm from "@mlc-ai/web-llm";
import "./app.css";

function App() {
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState([
    {
      role: "model",
      content: "Hello, How can I help you?",
    },
    {
      role: "user",
      content: "Hello, how are you?",
    },
    {
      role: "model",
      content: "I am fine, Thank you!",
    },
    {
      role: "user",
      content: "What is your name?",
    },
    {
      role: "model",
      content: "My name is chatGPT!",
    },
  ]);
  const [engine, setEngine] = useState(null);

  useEffect(() => {
    const selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC";
    webllm
      .CreateMLCEngine(selectedModel, {
        initProgressCallback: (initProgress) => {
          console.log("initProgress", initProgress);
        },
      })
      .then((engine) => {
        setEngine(engine);
        console.log("engine", engine);
      });
  }, []);

  return (
    <main>
      <section>
        <div className="conversation-area">
          <div className="messages">
            {messages.map((message, index) => {
              return (
                <div className={`message ${message.role}`} key={index}>
                  {message.content}
                </div>
              );
            })}
          </div>
          <div className="input-area">
            <input type="text" placeholder="Message LLm" />
            <button>Send</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
