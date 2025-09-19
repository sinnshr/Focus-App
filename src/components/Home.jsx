import Window from './Window';
import { ImCross } from "react-icons/im";
import { BiPlus } from "react-icons/bi";
import { useState } from "react";

function Home() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    function addTask() {
        if (task.trim() !== "") {
            setTasks(prevTasks => [
                ...prevTasks,
                { text: task, completed: false }
            ]);
            setTask(""); // Clear input
        }
    }

    function delTask(idx) {
        return () => {
            setTasks(prevTasks => prevTasks.filter((_, i) => i !== idx));
            // Filters out the given index
        };
    }

    function toggleTask(idx) {
        setTasks(prevTasks =>
            prevTasks.map((t, i) =>
                i === idx ? { ...t, completed: !t.completed } : t
            )
        );
    }

    return (
        <Window title="To Do List">
            <div className="px-5 py-8 flex justify-center items-center">
                {/* Plant Icon */}
                <i className="hn hn-seedlings text-4xl text-text pb-3"></i>
                {/* addTask Label and Input */}
                <label className="p-1 text-3xl text-[#1f291f]">Plant a Seed:</label>
                <input
                    placeholder="Add a task..."
                    className="border-neutral-700 border-2 rounded-md text-center py-[6px] px-3  focus:border-neutral-700 focus:ring-0 focus:outline-none focus:shadow-[5px_5px_1px_0_#819067] shadow-[5px_5px_1px_0_#819067] text-lg bg-[#cee2ce]"
                    value={task}
                    onChange={e => setTask(e.target.value)}
                />
                {/* addTask button */}
                <button
                    className="border-3 border-amber-700 mx-2 rounded-md p-[6px] bg-amber-700 
                        shadow-[inset_2px_2px_8px_#a86b2a,3px_3px_1px_0_#250f0f,0_2px_8px_0_#fff7e0]
                        active:translate-y-1 active:shadow-[0_1px_2px_0_#250f0f] transition-all"
                    onClick={addTask}
                    type="button"
                >
                    <BiPlus className="size-6 text-[#FFFFFF]" />
                </button>
            </div>
            {tasks.length > 0 ? (
                // List of Tasks
                <div className="px-[130px] ">
                    <ul className="overflow-y-auto max-h-72 [&:has(li:nth-child(7))]:pr-2">
                        {tasks.map((t, idx) => (
                            <li
                                key={idx}
                                className={`flex items-center text-2xl py-1 text-[#1f291f] justify-between ${idx !== 0 ? "border-t-2 border-dashed border-[#819267]" : ""}`}
                            >
                                <div className="flex">
                                    <span className="mr-2 flex items-center relative">
                                        {/* Checkbox */}
                                        <input
                                            type="checkbox"
                                            checked={t.completed}
                                            onChange={() => toggleTask(idx)}
                                            className="size-5 accent-[#819267] border-2 border-text rounded appearance-none bg-[#CADCAE]"
                                        />

                                        {/* Add Check Icon when checkbox is checked */}
                                        <span className="absolute left-0 top-0 w-6 h-6 flex items-center pointer-events-none">
                                            {t.completed ? (
                                                <i className="hn hn-check-solid text-3xl -mb-1.5 text-[#9c544b] transition-opacity duration-500"></i>
                                            ) : (
                                                <span className="inline-block w-6 h-6" />
                                            )}
                                        </span>
                                    </span>
                                    <span className={t.completed ? "line-through text-text-muted" : ""}>
                                        {t.text}
                                    </span>
                                </div>
                                <div className="px-3 pt-1.5" >
                                    <button onClick={delTask(idx)}><ImCross className=" size-4.5 text-error hover:text-red-800" /></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                // Empty List Message
                <div className="flex justify-center items-center text-wrap h-full pb-20">
                    <div className="flex justify-center items-center text-center">
                            <h3 className="text-text-muted text-xl cursor-default">No tasks added yet...</h3>
                    </div>
                </div>
            )
            }
        </Window >
    )
}

export default Home