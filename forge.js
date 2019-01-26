'use strict';

const neo4j = 

// Create a driver instance, for the user neo4j with password neo4j.
// It should be enough to have a single driver per database per application.
let driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"));

// Create a session to run Cypher statements in.
// Note: Always make sure to close sessions when you are done using them!
let session = driver.session();

// Run a Cypher statement, reading the result in a streaming manner as records arrive:
session
    .run('MERGE (alice:Person {name : {nameParam} }) RETURN alice.name AS name', {nameParam: 'Alice'})
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
