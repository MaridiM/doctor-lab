import { nextJsConfig } from "@doctorlab/eslint-config/next-js";
import { config } from '@doctorlab/eslint-config/base'

/** @type {import("eslint").Linter.Config} */
export default [...config, nextJsConfig];
