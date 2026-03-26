#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const lunr = require('lunr');

const dataDir = path.join(__dirname, '..', 'public', 'data');
const inputFile = path.join(dataDir, 'comic_artist_index.json');
const indexFile = path.join(dataDir, 'lunr-index.json');
const searchDataFile = path.join(dataDir, 'search-data.json');

console.log('Building Lunr search index...');

const raw = fs.readFileSync(inputFile, 'utf-8');
const data = JSON.parse(raw);
const artists = data.artists || [];

// Build search metadata (lightweight lookup)
const searchData = artists.map((a) => ({
  id: a.id,
  name: a.name,
  location: a.location,
  experience_level: a.experience_level,
  roles: a.roles,
  genres: a.genres,
}));

// Build Lunr index
const idx = lunr(function () {
  this.ref('id');
  this.field('name', { boost: 10 });
  this.field('bio');
  this.field('location');
  this.field('roles');
  this.field('genres');

  artists.forEach((a) => {
    this.add({
      id: a.id,
      name: a.name || '',
      bio: a.bio || '',
      location: a.location || '',
      roles: (a.roles || []).join(' '),
      genres: (a.genres || []).join(' '),
    });
  });
});

fs.writeFileSync(indexFile, JSON.stringify(idx), 'utf-8');
fs.writeFileSync(searchDataFile, JSON.stringify(searchData), 'utf-8');

console.log(`Index built: ${artists.length} artists indexed.`);
console.log(`   -> ${indexFile}`);
console.log(`   -> ${searchDataFile}`);
