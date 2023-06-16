/* eslint-disable eslint-plugin/prefer-message-ids */
/* eslint-disable eslint-plugin/require-meta-type */
/* eslint-disable eslint-plugin/require-meta-schema */
module.exports = {
  // create: (context) => {
  //   return {
  //     CallExpression: (node) => {
  //       const calleeNode = node.callee;
  //       if (!calleeNode.object) {
  //         return;
  //       }
  //       let rootObject = node.arguments[0];
  //       while (rootObject.object) {
  //         rootObject = rootObject.object;
  //       }
  //       if (rootObject.name === "routes") {
  //         const x = context.getSourceCode().getScope(rootObject);
  //         console.log(x);
  //       }
  //       const isError =
  //         calleeNode.object.name === "router" &&
  //         (calleeNode.property.name === "push" ||
  //           calleeNode.property.name === "replace") &&
  //         (node.arguments[0].value === "/api/auth/login" ||
  //           node.arguments[0].value === "/api/auth/logout");
  //       if (isError) {
  //         context.report({
  //           node,
  //           message: "Some error",
  //         });
  //       }
  //     },
  //   };
  // },

  create: (context) => {
    return {
      CallExpression: (node) => {
        if (node.callee.type === "MemberExpression") {
          const { object, property } = node.callee;

          if (
            object.name === "router" &&
            (property.name === "push" || property.name === "replace")
          ) {
            const [firstArgument] = node.arguments;
            const path = firstArgument.value;

            console.log(node.arguments);

            if (path && path.startsWith("/api/auth/login")) {
              context.report({
                node,
                message: "Some error",
              });
            }
          }
        }
      },
    };
  },
};
