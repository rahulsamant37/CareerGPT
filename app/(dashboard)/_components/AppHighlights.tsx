import { Award, Sparkles, Zap } from "lucide-react";
import React from "react";

const AppHighlights = () => {
  return (
    <div className="m-[40px_auto_0] mb-[30px]">
      <div className="hidden lg:flex items-center justify-center gap-7 ">
        {/* First Achievement */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 28 53"
              className="mr-3.5 w-7 h-[53px]"
              aria-hidden="true"
            >
              <path
                fill="#60717A"
                d="M27 2q-1 3-7 4c0-2 3-6 7-4M17 8q2-2 2-8-3 2-2 8m-1 1q2-3 8-1-2 3-8 1m-2 3q2-2 1-8-3 2-1 8m0 0 7-1q-3 4-7 1m-3 5q3-4-1-8-3 3 1 8m-1 1q3 1 8-2-3-4-8 2m-2 5q4 1 8-4-4-1-8 4m-1 5q5 0 8-6-5 0-8 6m1 4c1 0 6-2 6-6q-4 1-6 6m1 4q3 0 6-6-4 0-6 6m2 3q3-1 4-6-4 0-4 6m2 3q2-1 3-6-3 0-3 6m3 4q3-1 2-7c-4 1-2 4-2 7m4 2q2-1 1-7-4 3-1 7m6 4v-1c-4-2-13-5-17-16-5-12 5-24 10-29-6 5-15 17-12 28 4 13 16 17 19 18m-18-29q2-4-2-9-3 4 2 9m-1 4c1-1 0-6-4-7-1 1 1 7 4 7m0 5c0-1-2-7-6-6 0 1 3 6 6 6m1 3c-1-1-4-5-8-3q2 4 8 3m-1 1c0-1-5-5-8-2q3 4 8 2m4 4c-1-1-5-4-8-1q3 4 8 1m3 3q-3-2-8 1 5 2 8-1m4 3q-3-2-8 2 5 2 8-2"
              />
            </svg>

            {/* Text Content */}
            <div className="text-center">
              <h3 className="text-xs text-[#374356] leading-[14px]">
                #1 Job Assistant AI
              </h3>
              <div className="text-base font-bold text-[#070D1B] leading-7">
                Original
              </div>
            </div>

            {/* Right Laurel */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 28 53"
              className="ml-3.5 w-7 h-[53px] transform scale-x-[-1]"
              aria-hidden="true"
            >
              <path
                fill="#60717A"
                d="M27 2q-1 3-7 4c0-2 3-6 7-4M17 8q2-2 2-8-3 2-2 8m-1 1q2-3 8-1-2 3-8 1m-2 3q2-2 1-8-3 2-1 8m0 0 7-1q-3 4-7 1m-3 5q3-4-1-8-3 3 1 8m-1 1q3 1 8-2-3-4-8 2m-2 5q4 1 8-4-4-1-8 4m-1 5q5 0 8-6-5 0-8 6m1 4c1 0 6-2 6-6q-4 1-6 6m1 4q3 0 6-6-4 0-6 6m2 3q3-1 4-6-4 0-4 6m2 3q2-1 3-6-3 0-3 6m3 4q3-1 2-7c-4 1-2 4-2 7m4 2q2-1 1-7-4 3-1 7m6 4v-1c-4-2-13-5-17-16-5-12 5-24 10-29-6 5-15 17-12 28 4 13 16 17 19 18m-18-29q2-4-2-9-3 4 2 9m-1 4c1-1 0-6-4-7-1 1 1 7 4 7m0 5c0-1-2-7-6-6 0 1 3 6 6 6m1 3c-1-1-4-5-8-3q2 4 8 3m-1 1c0-1-5-5-8-2q3 4 8 2m4 4c-1-1-5-4-8-1q3 4 8 1m3 3q-3-2-8 1 5 2 8-1m4 3q-3-2-8 2 5 2 8-2"
              />
            </svg>
          </div>

          <div>
            <Award style={{ color: "#FFA500" }} />
          </div>
        </div>

        {/* Second Achievement */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 28 53"
              className="mr-3.5 w-7 h-[53px]"
              aria-hidden="true"
            >
              <path
                fill="#60717A"
                d="M27 2q-1 3-7 4c0-2 3-6 7-4M17 8q2-2 2-8-3 2-2 8m-1 1q2-3 8-1-2 3-8 1m-2 3q2-2 1-8-3 2-1 8m0 0 7-1q-3 4-7 1m-3 5q3-4-1-8-3 3 1 8m-1 1q3 1 8-2-3-4-8 2m-2 5q4 1 8-4-4-1-8 4m-1 5q5 0 8-6-5 0-8 6m1 4c1 0 6-2 6-6q-4 1-6 6m1 4q3 0 6-6-4 0-6 6m2 3q3-1 4-6-4 0-4 6m2 3q2-1 3-6-3 0-3 6m3 4q3-1 2-7c-4 1-2 4-2 7m4 2q2-1 1-7-4 3-1 7m6 4v-1c-4-2-13-5-17-16-5-12 5-24 10-29-6 5-15 17-12 28 4 13 16 17 19 18m-18-29q2-4-2-9-3 4 2 9m-1 4c1-1 0-6-4-7-1 1 1 7 4 7m0 5c0-1-2-7-6-6 0 1 3 6 6 6m1 3c-1-1-4-5-8-3q2 4 8 3m-1 1c0-1-5-5-8-2q3 4 8 2m4 4c-1-1-5-4-8-1q3 4 8 1m3 3q-3-2-8 1 5 2 8-1m4 3q-3-2-8 2 5 2 8-2"
              />
            </svg>

            {/* Text Content */}
            <div className="text-center">
              <h3 className="text-xs text-[#374356] leading-[14px]">
                AI-Powered Transformations
              </h3>
              <div className="text-base font-bold text-[#070D1B] leading-7">
                95% User Satisfaction
              </div>
            </div>

            {/* Right Laurel */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 28 53"
              className="ml-3.5 w-7 h-[53px] transform scale-x-[-1]"
              aria-hidden="true"
            >
              <path
                fill="#60717A"
                d="M27 2q-1 3-7 4c0-2 3-6 7-4M17 8q2-2 2-8-3 2-2 8m-1 1q2-3 8-1-2 3-8 1m-2 3q2-2 1-8-3 2-1 8m0 0 7-1q-3 4-7 1m-3 5q3-4-1-8-3 3 1 8m-1 1q3 1 8-2-3-4-8 2m-2 5q4 1 8-4-4-1-8 4m-1 5q5 0 8-6-5 0-8 6m1 4c1 0 6-2 6-6q-4 1-6 6m1 4q3 0 6-6-4 0-6 6m2 3q3-1 4-6-4 0-4 6m2 3q2-1 3-6-3 0-3 6m3 4q3-1 2-7c-4 1-2 4-2 7m4 2q2-1 1-7-4 3-1 7m6 4v-1c-4-2-13-5-17-16-5-12 5-24 10-29-6 5-15 17-12 28 4 13 16 17 19 18m-18-29q2-4-2-9-3 4 2 9m-1 4c1-1 0-6-4-7-1 1 1 7 4 7m0 5c0-1-2-7-6-6 0 1 3 6 6 6m1 3c-1-1-4-5-8-3q2 4 8 3m-1 1c0-1-5-5-8-2q3 4 8 2m4 4c-1-1-5-4-8-1q3 4 8 1m3 3q-3-2-8 1 5 2 8-1m4 3q-3-2-8 2 5 2 8-2"
              />
            </svg>
          </div>

          {/* <div>✨</div> */}
          <div>
            <Sparkles style={{ color: "#8A2BE2" }} />
          </div>
        </div>

        {/* Last Achievement */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 28 53"
              className="mr-3.5 w-7 h-[53px]"
              aria-hidden="true"
            >
              <path
                fill="#60717A"
                d="M27 2q-1 3-7 4c0-2 3-6 7-4M17 8q2-2 2-8-3 2-2 8m-1 1q2-3 8-1-2 3-8 1m-2 3q2-2 1-8-3 2-1 8m0 0 7-1q-3 4-7 1m-3 5q3-4-1-8-3 3 1 8m-1 1q3 1 8-2-3-4-8 2m-2 5q4 1 8-4-4-1-8 4m-1 5q5 0 8-6-5 0-8 6m1 4c1 0 6-2 6-6q-4 1-6 6m1 4q3 0 6-6-4 0-6 6m2 3q3-1 4-6-4 0-4 6m2 3q2-1 3-6-3 0-3 6m3 4q3-1 2-7c-4 1-2 4-2 7m4 2q2-1 1-7-4 3-1 7m6 4v-1c-4-2-13-5-17-16-5-12 5-24 10-29-6 5-15 17-12 28 4 13 16 17 19 18m-18-29q2-4-2-9-3 4 2 9m-1 4c1-1 0-6-4-7-1 1 1 7 4 7m0 5c0-1-2-7-6-6 0 1 3 6 6 6m1 3c-1-1-4-5-8-3q2 4 8 3m-1 1c0-1-5-5-8-2q3 4 8 2m4 4c-1-1-5-4-8-1q3 4 8 1m3 3q-3-2-8 1 5 2 8-1m4 3q-3-2-8 2 5 2 8-2"
              />
            </svg>

            {/* Text Content */}
            <div className="text-center">
              <h3 className="text-xs text-[#374356] leading-[14px]">
                Ace Your Interview
              </h3>
              <div className="text-base font-bold text-[#070D1B] leading-7">
                Practice in Mins
              </div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 28 53"
              className="ml-3.5 w-7 h-[53px] transform scale-x-[-1]"
              aria-hidden="true"
            >
              <path
                fill="#60717A"
                d="M27 2q-1 3-7 4c0-2 3-6 7-4M17 8q2-2 2-8-3 2-2 8m-1 1q2-3 8-1-2 3-8 1m-2 3q2-2 1-8-3 2-1 8m0 0 7-1q-3 4-7 1m-3 5q3-4-1-8-3 3 1 8m-1 1q3 1 8-2-3-4-8 2m-2 5q4 1 8-4-4-1-8 4m-1 5q5 0 8-6-5 0-8 6m1 4c1 0 6-2 6-6q-4 1-6 6m1 4q3 0 6-6-4 0-6 6m2 3q3-1 4-6-4 0-4 6m2 3q2-1 3-6-3 0-3 6m3 4q3-1 2-7c-4 1-2 4-2 7m4 2q2-1 1-7-4 3-1 7m6 4v-1c-4-2-13-5-17-16-5-12 5-24 10-29-6 5-15 17-12 28 4 13 16 17 19 18m-18-29q2-4-2-9-3 4 2 9m-1 4c1-1 0-6-4-7-1 1 1 7 4 7m0 5c0-1-2-7-6-6 0 1 3 6 6 6m1 3c-1-1-4-5-8-3q2 4 8 3m-1 1c0-1-5-5-8-2q3 4 8 2m4 4c-1-1-5-4-8-1q3 4 8 1m3 3q-3-2-8 1 5 2 8-1m4 3q-3-2-8 2 5 2 8-2"
              />
            </svg>
          </div>
          <div>
            <Zap style={{ color: "#268DE1" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHighlights;
