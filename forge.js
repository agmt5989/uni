'use strict';

const neo4j = require('neo4j-driver').v1;

// Create a driver instance, for the user neo4j with password neo4j.
// It should be enough to have a single driver per database per application.
let driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "admin"));

// Create a session to run Cypher statements in.
// Note: Always make sure to close sessions when you are done using them!
let session = driver.session();
console.log(driver);

// Run a Cypher statement, reading the result in a streaming manner as records arrive:
session
    .run('CREATE (ee:Person { name: {name}, from: "Sweden", klout: 99 })', {name: 'Alice Wonderland'})
    .subscribe({
        onNext: function (record) {
            console.log(record.get('name'));
        },
        onCompleted: function () {
            session.close();
        },
        onError: function (error) {
            console.log(error);
        }
    });

// Close the driver when application exits.
// This closes all used network connections.
driver.close();
