import React from 'react'
import Window from './Window'
import { useState } from "react";
import { toast } from 'react-toastify';


function Note() {
  const [text, setText] = useState("");

  function copyAll() {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("Text Copied to Clipboard.");
      })
      .catch(() => {
        toast.error("Failed to Copy Text.");
      });
  }

  function clearTxt() {
    setText("");
  }

  function saveAsTxt() {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById("note").value], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "myNote.txt";
    document.body.appendChild(element);
    element.click();
  }

  return (
    <Window>
      <textarea className='rounded-2xl focus:ring-0 focus:outline-none' value={text} onChange={e => setText(e.target.value)} id='note'></textarea>
      <div className='flex justify-center gap-4 items-start h-[18%]'>
        <button onClick={copyAll} className='text-xl px-5 py-2 text-white border-3 border-amber-700 rounded-3xl bg-amber-700 shadow-[inset_2px_2px_8px_#a86b2a,3px_3px_1px_0_#250f0f,0_2px_8px_0_#fff7e0] active:translate-y-1 active:shadow-[0_1px_2px_0_#250f0f] transition-all'>
          Copy all
        </button>
        <button onClick={clearTxt} className='text-xl px-5 py-2 text-white border-3 border-amber-700 rounded-3xl bg-amber-700 shadow-[inset_2px_2px_8px_#a86b2a,3px_3px_1px_0_#250f0f,0_2px_8px_0_#fff7e0] active:translate-y-1 active:shadow-[0_1px_2px_0_#250f0f] transition-all'>
          Clear
        </button>
        <button onClick={saveAsTxt} className='text-xl px-5 py-2 text-white border-3 border-amber-700 rounded-3xl bg-amber-700 shadow-[inset_2px_2px_8px_#a86b2a,3px_3px_1px_0_#250f0f,0_2px_8px_0_#fff7e0] active:translate-y-1 active:shadow-[0_1px_2px_0_#250f0f] transition-all'>
          Save as txt
        </button>
      </div>
    </Window>
  )
}

export default Note