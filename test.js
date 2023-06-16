"use strict";

const rule = require("./lib/rules/no-auth-route-cst"),
  RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
});

const ruleTester = new RuleTester();

ruleTester.run("my-rule", rule, {
  valid: [],

  invalid: [
    // {
    //   code: `
    //     const Foo = () => {
    //     const router = useRouter();
    //     router.push("/api/auth/login");
    //     return null;
    //   };
    //   `,
    //   errors: [{ message: "Some error" }],
    // },
    // {
    //   code: `
    //     const Foo = () => {
    //     const router = useRouter();
    //     router.replace("/api/auth/login");
    //     return null;
    //   };
    //   `,
    //   errors: [{ message: "Some error" }],
    // },
    // {
    //   code: `
    //     import routes from "./routes";
    //     const Foo = () => {
    //     const router = useRouter();
    //     router.replace(routes.auth.login);
    //     return null;
    //   };
    //   `,
    //   errors: [{ message: "Some error" }],
    // },
    {
      code: `
        const main = () => {
        const router = useRouter();
        
        router.push("/api/auth/login?foo=bar");
        router.replace("/api/auth/login/");
        router.push("/flights");
        router.replace("/flights");
        router.a = "asdas"
        
        const push = router.push
        
        foo("bar")
      }
      `,
      errors: [{ message: "asdsd" }],
    },
  ],
});
