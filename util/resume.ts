import rawResume from "./resume.json"
import {schema} from "./jsonResumeZOD"
import { z } from "zod"
const resume=schema.parse(rawResume)
export default resume
export type ResumeSchema=z.infer<typeof schema>