/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as action from "../action.js";
import type * as apiLimit from "../apiLimit.js";
import type * as job from "../job.js";
import type * as jobInsightConversation from "../jobInsightConversation.js";
import type * as payment from "../payment.js";
import type * as paymentAction from "../paymentAction.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  action: typeof action;
  apiLimit: typeof apiLimit;
  job: typeof job;
  jobInsightConversation: typeof jobInsightConversation;
  payment: typeof payment;
  paymentAction: typeof paymentAction;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
