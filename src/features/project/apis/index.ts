import AXIOS from "../../../services/axios";

// Assuming your FastAPI router prefix is "/projects"
const BASE_PATH = "/projects";

const ProjectServices = {
  createProjectApi: async (data: Record<string, any>) => {
    const endpoint = `${BASE_PATH}`;
    const response = await AXIOS.post(endpoint, data);
    return response.data;
  },

  getProjectApi: async (projectId: number | string) => {
    const endpoint = `${BASE_PATH}/${projectId}`;
    const response = await AXIOS.get(endpoint);
    return response.data;
  },

  getOrgProjectsApi: async (orgId: number | string) => {
    const endpoint = `${BASE_PATH}/organization/${orgId}`;
    const response = await AXIOS.get(endpoint);
    return response.data;
  },

  getMyProjectsApi: async () => {
    const endpoint = `${BASE_PATH}/my-projects`;
    const response = await AXIOS.get(endpoint);
    return response.data;
  },

  updateProjectApi: async (projectId: number | string, data: Record<string, any>) => {
    const endpoint = `${BASE_PATH}/${projectId}`;
    const response = await AXIOS.patch(endpoint, data); 
    return response.data;
  },

  assignTeamApi: async (projectId: number | string, data: { team_member_ids: number[] }) => {
    const endpoint = `${BASE_PATH}/${projectId}/assign-team`;
    const response = await AXIOS.post(endpoint, data);
    return response.data;
  },

  deleteProjectApi: async (projectId: number | string) => {
    const endpoint = `${BASE_PATH}/${projectId}`;
    const response = await AXIOS.delete(endpoint);
    return response.data;
  },
};

export default ProjectServices;