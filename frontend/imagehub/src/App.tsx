//
// Patrick Carvalho
// copyright 2022
//

import React, { ChangeEvent } from "react";
import 'react-toastify/dist/ReactToastify.css';
import DragDrop from "./components/DragDrop";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white-300 dark:bg-slate-800 dark:border-slate-500 ">
      <DragDrop/>
    </div>
  );
}

export default App;
