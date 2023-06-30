"use strict";

const rule = require("../../../lib/rules/no-auth-route-cst"),
  RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
});

const ruleTester = new RuleTester();

ruleTester.run("no-auth-route-cst", rule, {
  valid: [],

  invalid: [
    {
      name: "Template literal without interpolation",
      code: `
      export const foo = () => {
      const router = useRouter();

      router.replace(
        \`/api/auth/login\`
      );
    };
    `,
      errors: [{ message: "Some error" }],
    },
    {
      name: "Template literal with interpolation",
      code: `
      export const foo = () => {
      const router = useRouter();

      router.replace(
        \`/api/auth/login?returnTo=\${encodeURIComponent(returnToPath)}\`
      );
    };
    `,
      errors: [{ message: "Some error" }],
    },
  ],
});
