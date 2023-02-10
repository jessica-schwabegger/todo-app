import { ITaskCard } from "interface/ITaskCard";

export const getTasks = async () => {
    const response = await fetch("/getTasks");
    const tasks = await response.json();
    // console.log(tasks)
    // tasks.tasks.sort((a: ITaskCard, b: ITaskCard) => {
    //     if (Number(a.index) < Number(b.index)) {
    //         return 1;
    //     } if(Number(a.index) > Number(b.index)) {
    //         return -1;
    //     }
    // })
    return tasks.tasks;
};