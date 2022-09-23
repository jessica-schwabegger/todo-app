import React from 'react';
import './App.css';
import { TasksView } from "components/TasksView/TasksView";
import { NewTask } from "components/NewTask/NewTask";



function App() {
  return (
    <div className="App">
      <>
        <NewTask />
        <TasksView />
        </>
    </div>
  );
}

export default App;
