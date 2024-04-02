const db = require('../config/connection');
const { Subject } = require('../models');
const subjectSeeds = require('./subjectSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Subject', 'subjects');
    
    await Subject.create(subjectSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});