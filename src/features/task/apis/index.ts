import AXIOS from "../../../services/axios";

const BASE_PATH = "/tasks";

const TaskServices = {
  createTaskApi: async (data: Record<string, any>) => {
    const endpoint = `${BASE_PATH}/`;
    const response = await AXIOS.post(endpoint, data);
    return response.data;
  },

  listTasksApi: async (params?: Record<string, any>) => {
    const endpoint = `${BASE_PATH}/`;
    const response = await AXIOS.get(endpoint, { params });
    return response.data;
  },

  getTaskApi: async (taskId: number | string) => {
    const endpoint = `${BASE_PATH}/${taskId}`;
    const response = await AXIOS.get(endpoint);
    return response.data;
  },

  getMyTasksApi: async () => {
    const endpoint = `${BASE_PATH}/my-tasks`;
    const response = await AXIOS.get(endpoint);
    return response.data;
  },

  getProjectTasksApi: async (projectId: number | string) => {
    const endpoint = `${BASE_PATH}/project/${projectId}`;
    const response = await AXIOS.get(endpoint);
    return response.data;
  },

  getEligibleUsersApi: async (taskId: number | string) => {
    const endpoint = `${BASE_PATH}/${taskId}/eligible-users`;
    const response = await AXIOS.get(endpoint);
    return response.data;
  },

  updateTaskApi: async (taskId: number | string, data: Record<string, any>) => {
    const endpoint = `${BASE_PATH}/${taskId}`;
    const response = await AXIOS.patch(endpoint, data);
    return response.data;
  },

  updateTaskStatusApi: async (taskId: number | string, data: { status: string }) => {
    const endpoint = `${BASE_PATH}/${taskId}/status`;
    const response = await AXIOS.patch(endpoint, data);
    return response.data;
  },

  addSubtaskApi: async (taskId: number | string, data: Record<string, any>) => {
    const endpoint = `${BASE_PATH}/${taskId}/subtasks`;
    const response = await AXIOS.post(endpoint, data);
    return response.data;
  },

  recomputeTaskApi: async (taskId: number | string) => {
    const endpoint = `${BASE_PATH}/${taskId}/recompute`;
    const response = await AXIOS.post(endpoint, {});
    return response.data;
  },

  deleteTaskApi: async (taskId: number | string) => {
    const endpoint = `${BASE_PATH}/${taskId}`;
    const response = await AXIOS.delete(endpoint);
    return response.data;
  },
};

export default TaskServices;