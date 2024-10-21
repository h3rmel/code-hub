//#region Imports

import { expect, afterEach } from "vitest";

import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

//#endregion

expect.extend(matchers);

afterEach(cleanup);
