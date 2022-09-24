import resume from "./resume.json"
import resumeSchema from "./jsonResumeZOD"
const cv=resumeSchema.parse(resume)
export default cv