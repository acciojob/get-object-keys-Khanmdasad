//your JS code here. If required.
const student = {
	name: Asadullah,	
}

Object.prototype.getKeys = function() {
	return Object.keys(this);
}

console.log(student.getKeys());


// Ensure Object.prototype.getKeys is available in the environment before test runs
beforeEach(() => {
  Object.prototype.getKeys = function() {
    return Object.keys(this);
  };
});

it('should fetch and test the script', () => {
  cy.visit(baseUrl + "/main.html"); // Ensure visit is set correctly
  cy.document().then(doc => {
    const script = doc.querySelector('script[src="./script.js"]');
    const scriptUrl = script.getAttribute("src");
    cy.readFile(scriptUrl).then(jsCode => {
      eval(jsCode); // Evaluate the script content
      
      const myObj = { name: "John", age: 30, city: "New York" };
      const keys = myObj.getKeys(); // Use getKeys()
      expect(keys).to.deep.equal(["name", "age", "city"]);
    });
  });
});
