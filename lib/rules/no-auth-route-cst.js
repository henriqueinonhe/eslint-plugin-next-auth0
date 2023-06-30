/* eslint-disable eslint-plugin/prefer-message-ids */
/* eslint-disable eslint-plugin/require-meta-type */
/* eslint-disable eslint-plugin/require-meta-schema */
module.exports = {
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
            const path = extractPath(firstArgument);

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

const extractPath = (argument) => {
  if (argument.type === "Literal") {
    return argument.value;
  }

  if (argument.type === "TemplateLiteral") {
    return argument.quasis[0].value.raw;
  }

  throw new Error("Unknown argument type");
};
