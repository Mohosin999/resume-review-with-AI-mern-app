/* ===================================
Custom Hook: useResumeBuilder
Composite hook combining resume builder functionality
=================================== */
import { useSavedResumes } from "./useSavedResumes";
import { useResumeActions } from "./useResumeActions";

export function useResumeBuilder() {
  const { savedResumes, loading, fetchResumes } = useSavedResumes();
  const resumeActions = useResumeActions();

  return {
    ...resumeActions,
    savedResumes,
    loading,
    fetchResumes,
  };
}

export { useResumeContent } from "./useResumeContent";
