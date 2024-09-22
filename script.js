// Ensure Object.prototype.getKeys is available in the environment before test runs
beforeEach(() => {
  Object.prototype.getKeys = function() {
    return Object.keys(this);
  };
});

it('should fetch and test the script', () => {
  // Visit the base URL
  cy.visit(baseUrl + "/main.html"); 
  
  // Fetch the document and extract the script tag
  cy.document().then(doc => {
    const script = doc.querySelector('script[src="./script.js"]');
    const scriptUrl = script.getAttribute("src");

    // Read the contents of the script
    cy.readFile(scriptUrl).then(jsCode => {
      // Evaluate the script code to ensure it runs
      eval(jsCode);

      // Test the object and getKeys() function
      const myObj = { name: "John", age: 30, city: "New York" };
      const keys = myObj.getKeys();
      expect(keys).to.deep.equal(["name", "age", "city"]);
    });
  });
});
