export type TaskStatus =
  | "To Do"
  | "In Progress"
  | "In Review"
  | "Done"
  | "Blocked";

export type KanbanStatus = "To Do" | "In Progress" | "Done";

export type Priority = "Low" | "Medium" | "High" | "Critical";

export type TaskType =
  | "Feature"
  | "Bug"
  | "Improvement"
  | "Research"
  | "Documentation";

export type SubTaskStatus = "To Do" | "In Progress" | "Done";


export type Comment = {
  id: string;
  author: string;
  text: string;
  date: string;
};

export type SubTask = {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: SubTaskStatus;
  priority: Priority;
  dueDate: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  project: string;
  assignedTo: string;
  status: TaskStatus;
  priority: Priority;
  startDate: string;
  dueDate: string;
  type: TaskType;
  reporter: string;
  comments: Comment[];
  subTasks: SubTask[];
  createdAt: string;
};


export type TaskFormData = {
  title: string;
  description: string;
  project: string;
  assignedTo: string;
  status: TaskStatus;
  priority: Priority;
  startDate: string;
  dueDate: string;
  type: TaskType;
  reporter: string;
  comments: Comment[];
};

export type SubTaskFormData = {
  title: string;
  description: string;
  assignedTo: string;
  status: SubTaskStatus;
  priority: Priority;
  dueDate: string;
};

export type TaskFormErrors    = Partial<Record<keyof TaskFormData, string>>;
export type SubTaskFormErrors = Partial<Record<keyof SubTaskFormData, string>>;


export type StatusConfig = {
  bg: string;
  text: string;
  border: string;
  dot: string;
  colBg: string;
  colBorder: string;
  header: string;
  headerText: string;
  icon: string;
};

export type PriorityConfig = {
  bg: string;
  text: string;
  border: string;
  dot: string;
  bar: string;
};

export type TypeConfig = {
  icon: string;
  color: string;
};

export type TaskActionHandlers = {
  onView:   (task: Task) => void;
  onEdit:   (task: Task) => void;
  onDelete: (task: Task) => void;
};

export type ModalCloseHandler = {
  onClose: () => void;
};


export type HeaderProps = {
  onNewTask: () => void;
};

export type FiltersProps = {
  search: string;
  filterPriority: string;
  filterType: string;
  filterProject: string;
  totalCount: number;
  filteredCount: number;
  onSearch: (v: string) => void;
  onPriority: (v: string) => void;
  onType: (v: string) => void;
  onProject: (v: string) => void;
  onClear: () => void;
};
export type AddTaskModalProps = {
  open: boolean;
  onClose: () => void;
  defaultStatus: KanbanStatus;
  onAdd: (task: Task) => void;
};

export type TaskCardProps = Pick<TaskActionHandlers, "onView" | "onEdit" | "onDelete"> & {
  task: Task;
};

export type TypeBadgeProps = { type: TaskType };

export type StatusBadgeProps = { status: TaskStatus };

export type PriorityBadgeProps = { priority: Priority };

export type DeleteTaskModalProps = {
  task: Task | null;
  onClose: () => void;
  onConfirm: () => void;
};

export type AddSubTaskFormProps = {
  onAdd: (sub: SubTask) => void;
  onCancel: () => void;
};


export type EditTaskModalProps = {
  task: Task | null;
  onClose: () => void;
  onSave: (updated: Task) => void;
};

export type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};
export type FIProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};
export type FTProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export type FSProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: string[];
  error?: string;
};


export type KanbanColProps = TaskActionHandlers & {
  status: KanbanStatus;
  tasks: Task[];
  onAddTask: (status: KanbanStatus) => void;
};

export type SectionLabelProps = {
  icon: string;
  text: string;
  count?: number;
};

export type StatCardProps = {
  label: string;
  value: number;
  gradient: string;
  icon: string;
};


export type StatsBarProps = {
  tasks: Task[];
};

export type SubProgressProps = {
  subTasks: SubTask[];
};

export type TaskDetailModalProps = {
  task: Task | null;
  onClose: () => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export type MetaTileProps = {
  label: string;
  children: React.ReactNode;
};

export type TaskFormProps = {
  form: TaskFormData;
  setForm: (form: TaskFormData) => void;
  errors: TaskFormErrors;
  subTasks: SubTask[];
  setSubTasks: React.Dispatch<React.SetStateAction<SubTask[]>>;
};