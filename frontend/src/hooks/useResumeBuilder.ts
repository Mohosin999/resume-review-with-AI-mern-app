/* ===================================
Custom Hook: useResumeBuilder
Composite hook combining resume builder functionality
=================================== */
import { useResumeActions } from "./useResumeActions";

export function useResumeBuilder() {
  const resumeActions = useResumeActions();

  return {
    ...resumeActions,
    loading: false,
    fetchResumes: () => {},
  };
}

export { useResumeContent } from "./useResumeContent";
