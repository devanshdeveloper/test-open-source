import { JsonTemplateEngine } from "lang-json";

export default function langJSONTest() {
  const langJson = new JsonTemplateEngine();
  console.log(langJson);

  // Test 1: Simple Helper (No Inner Expression)
  (() => {
    const template = "Hello, {{#var name}}!";
    const data = { name: "world" };
    const result = langJson.processHelper(template, data);
    console.log(result === "Hello, world!" ? "Pass" : "Fail", result);
  })();

  // Test 2: Single Helper (Without Arguments)
  (() => {
    const template = "{{#randomGreeting}}!";
    const data = {};
    langJson.registerHelpers({
      randomGreeting() {
        return "Hi";
      },
    });
    const result = langJson.processHelper(template, data);
    console.log(result === "Hi!" ? "Pass" : "Fail", result);
  })();

  // Test 3: Helper with Inner Expression
  (() => {
    const template = "You have {{#if (eq status 'success')}} completed the task!{{/if}}";
    const data = { status: "success" };
    langJson.registerHelpers({
      eq(arg1, arg2) {
        return arg1 === arg2;
      },
      if(condition) {
        return condition ? "successfully" : "not";
      },
    });
    const result = langJson.processHelper(template, data);
    console.log(result === "You have successfully completed the task!" ? "Pass" : "Fail", result);
  })();

  // // Test 4: Missing Helper (Should leave the string as it is)
  // (() => {
  //   const template = "Status: {{#nonExistentHelper someArg}}";
  //   const data = { someArg: "value" };

  //   const result = langJson.processHelper(template, data);
  //   console.log(result === "Status: {{#nonExistentHelper someArg}}" ? "Pass" : "Fail", result);
  // })();

  // // Test 5: Multiple Nested Helpers
  // (() => {
  //   const template = "Result: {{#ifHelper (eqHelper (lowercase status) 'success')}} Great Job!{{/ifHelper}}";
  //   const data = { status: "SUCCESS" };
  //   langJson.registerHelpers({
  //     lowercase(arg) {
  //       return arg.toLowerCase();
  //     },
  //     eqHelper(arg1, arg2) {
  //       return arg1 === arg2;
  //     },
  //     ifHelper(condition) {
  //       return condition ? "Great Job!" : "Try again";
  //     },
  //   });
  //   const result = langJson.processHelper(template, data);
  //   console.log(result === "Result: Great Job!" ? "Pass" : "Fail", result);
  // })();

  // // Test 6: Nested Helpers with Data Lookup
  // (() => {
  //   const template = "Discount: {{#ifHelper (greaterThan totalAmount 100)}} You qualify for a discount!{{/ifHelper}}";
  //   const data = { totalAmount: 120 };
  //   langJson.registerHelpers({
  //     greaterThan(value, threshold) {
  //       return value > threshold;
  //     },
  //     ifHelper(condition) {
  //       return condition ? "You qualify for a discount!" : "No discount";
  //     },
  //   });
  //   const result = langJson.processHelper(template, data);
  //   console.log(result === "Discount: You qualify for a discount!" ? "Pass" : "Fail", result);
  // })();

  // // Test 7: Multiple Instances of the Same Helper
  // (() => {
  //   const template = "{{#uppercase name}}, you have {{#uppercase message}}!";
  //   const data = { name: "john", message: "one new message" };
  //   langJson.registerHelpers({
  //     uppercase(arg) {
  //       return arg.toUpperCase();
  //     },
  //   });
  //   const result = langJson.processHelper(template, data);
  //   console.log(result === "JOHN, you have ONE NEW MESSAGE!" ? "Pass" : "Fail", result);
  // })();

  // // Test 8: No Matches in String (Should return the string as is)
  // (() => {
  //   const template = "No helpers here.";
  //   const data = {};

  //   const result = langJson.processHelper(template, data);
  //   console.log(result === "No helpers here." ? "Pass" : "Fail", result);
  // })();

  // // Test 9: Incorrect Inner Expression Format (Should leave the string unchanged)
  // (() => {
  //   const template = "Check {{#ifHelper (eq status 'success' incomplete}}!";
  //   const data = { status: "success" };
  //   langJson.registerHelpers({
  //     eq(arg1, arg2) {
  //       return arg1 === arg2;
  //     },
  //     ifHelper(condition) {
  //       return condition ? "Passed" : "Failed";
  //     },
  //   });

  //   const result = langJson.processHelper(template, data);
  //   console.log(result === "Check {{#ifHelper (eq status 'success' incomplete}}!" ? "Pass" : "Fail", result);
  // })();
}
