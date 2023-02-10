export interface ITaskCard {
    taskText: string;
    isDone: boolean;
    inProgress?: boolean;
    id: number;
    index?: number;
    setReload?: React.Dispatch<React.SetStateAction<boolean>>;
}